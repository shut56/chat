import express from 'express'
import http from 'http'
import io from 'socket.io'
// import mongoose from 'mongoose'

import config from './config'
import mongooseService from './services/mongoose'
import { userModel } from './mongodb/models'

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

server.use('/static', express.static(`${__dirname}/public`))

server.use(express.json({ limit: '50kb' }))
// server.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} from ${req.ip}`)
//   next()
// })

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

server.post('/api/v1/auth', (req, res) => {
  console.log(req.body)
  res.json({ token: 'OK' })
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
  // mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  mongooseService.connect()

  server.post('/api/v1/user', (req, res) => {
    const newUser = req.body
    userModel.create(newUser)
    res.send('User added')
  })
}

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
