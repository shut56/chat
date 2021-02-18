import express from 'express'
import http from 'http'
import io from 'socket.io'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import config from './config'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import userModel from './mongodb/models'

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

const middleware = [
  express.json({ limit: '100kb' }),
  passport.initialize()
]

middleware.forEach((it) => server.use(it))

server.use('/static', express.static(`${__dirname}/public`))
passport.use('jwt', passportJWT)

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
    console.log('Connect', socket.id)
    console.log(`Hello ${socket.id}`)

    socket.on('setName', (name) => {
      const nameWithTag = `${name}#${tag}`
      tag += 1
      users.push(nameWithTag)
      socketIO.to(socket.id).emit('setName', nameWithTag)
    })

    socket.on('getMessageHistoryFromChannel', ({ channel }) => {
      socketIO.to(socket.id).emit('messageHistory', msgHist[channel])
    })

    socket.on('newMessage', (arg) => {
      const { channel, name, text } = arg
      console.log('New message!')
      const time = new Date()
      console.log(time)
      msgHist[channel] = [...msgHist[channel], { name, text, time }]
      socketIO.emit('messageHistory', msgHist[channel])
    })

    socket.on('addChannel', (channel) => {
      console.log('New channel created')
      channels = {...channels, [channel.id]: { ...channel }}
      msgHist = {...msgHist, [channel.id]: [] }
      console.log('Channels: ', channels)
      socketIO.emit('channelList', channels)
    })

    socketIO.to(socket.id).emit('channelListForUser', channels)
    console.log('Send history', socket.id)

    socket.on('disconnect', () => {
      console.log(`Bye-bye ${socket.id}`)
    })
  })
}

if (config.mongoEnabled) {
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()

  server.post('/api/v1/registration', (req, res) => {
    userModel.create(req.body)
    res.json({ registration: 'complete' })
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
}

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
