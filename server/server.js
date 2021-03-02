import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import io from 'socket.io'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'

import config from './config'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import userModel from './mongodb/models'
import auth from './middleware/auth'

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

const middleware = [
  express.json({ limit: '100kb' }),
  cookieParser(),
  passport.initialize()
]

middleware.forEach((it) => server.use(it))

server.use('/static', express.static(`${__dirname}/public`))
passport.use('jwt', passportJWT.jwt)

let msgHist = {
  'test-id': []
}
let users = []
let channels = {
  'test-id': {
    id: 'test-id',
    name: 'general',
    active: true
  }
}
let tag = 1

server.get('/', (req, res) => {
  res.send('Express server')
})

server.get('/api/history', (req, res) => {
  res.json(msgHist)
})

server.get('/api/channels', (req, res) => {
  res.json(channels)
})

if (config.socketsEnabled) {
  console.log('Sockets Enabled: ', config.socketsEnabled)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`Hello ${socket.id}`)

    socket.on('SOCKET_SEND', (action) => {
      switch (action.type) {
        case 'GET_CHANNELS_FROM_SERVER': {
          socketIO.to(socket.id).emit('SOCKET_IO', {
            type: 'GET_CHANNELS_FROM_SERVER',
            payload: channels
          })
          console.log('Send channels & history', socket.id)
          break
        }
        case 'SET_NAME': {
          const nameWithTag = `${action.payload.name}#${tag}`
          tag += 1
          users.push(nameWithTag)
          socketIO.to(socket.id).emit('SOCKET_IO', {
            type: 'SET_NAME',
            payload: nameWithTag
          })
          break
        }
        case 'GET_MESSAGE_HISTORY_FROM_CHANNEL': {
          socketIO.to(socket.id).emit('SOCKET_IO', {
            type: 'GET_MESSAGE_HISTORY_FROM_CHANNEL',
            payload: msgHist[action.payload]
          })
          break
        }
        case 'SEND_NEW_MESSAGE': {
          const { channel, name, text } = action.payload
          console.log('New message!')
          const time = new Date()
          console.log(time)
          msgHist[channel] = [...msgHist[channel], { name, text, time }]
          socketIO.emit('SOCKET_IO', {
            type: 'SEND_NEW_MESSAGE',
            payload: msgHist[channel]
          })
          break
        }
        case 'ADD_NEW_CHANNEL': {
          const channel = { ...action.payload, id: nanoid() }
          console.log('New channel created')
          channels = { ...channels, [channel.id]: { ...channel } }
          msgHist = { ...msgHist, [channel.id]: [] }
          console.log('Channels: ', channels)
          socketIO.emit('SOCKET_IO', {
            type: 'ADD_NEW_CHANNEL',
            payload: { channels, id: channel.id }
          })
          break
        }
        default: {
          console.log('Client Message Received')
        }
      }
    })

    socket.on('disconnect', () => {
      console.log(`Bye-bye ${socket.id}`)
    })
  })
}

if (config.mongoEnabled) {
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()

  server.post('/api/v1/register', async (req, res) => {
    console.log('New user: ', req.body)
    try {
      await userModel.create(req.body)
      res.json({ status: 'ok' })
    } catch (err) {
      res.json({ status: 'error', error: `${err}` })
    }
  })

  server.post('/api/v1/auth', async (req, res) => {
    console.log(req.body)
    try {
      const user = await userModel.findAndValidateUser(req.body)
      const payload = { uid: user.id }
      const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
      user.password = undefined
      console.log(`${user.email} logged`)
      res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
      res.json({ status: 'ok', token, user })
    } catch (err) {
      res.json({ status: 'error', error: `${err}` })
    }
  })

  server.get('/api/v1/verify', async (req, res) => {
    try {
      const jwtUser = jwt.verify(req.cookies.token, config.secret)
      const user = await userModel.findById(jwtUser.uid)
      const payload = { uid: user.id }
      const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
      user.password = undefined
      res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
      res.json({ status: 'ok', token, user })
    } catch (err) {
      res.json({ status: 'error', error: `${err}` })
    }
  })

  server.get('/api/v1/user-info', auth(['admin']), (req, res) => {
    res.json({ status: 'user-info' })
  })
}

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
