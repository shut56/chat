import express from 'express'
import http from 'http'
import io from 'socket.io'
import mongoose from 'mongoose'

import config from './config'
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

let msgHist = []
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

    socket.on('setName', (name) => {
      const nameWithTag = `${name}#${tag}`
      tag += 1
      users.push(nameWithTag)
      socketIO.to(socket.id).emit('setName', nameWithTag)
    })

    socketIO.to(socket.id).emit('messageHistory', msgHist)

    socket.on('newMessage', (arg) => {
      console.log('New message!')
      msgHist.push(arg)
      socketIO.emit('messageHistory', msgHist)
    })

    socket.on('addChannel', (channel) => {
      console.log('New channel created')
      channels = {...channels, [channel.id]: { ...channel }}
      console.log('Channels: ', channels)
      socketIO.emit('channelList', channels)
    })

    socketIO.to(socket.id).emit('channelListForUser', channels)

    socket.on('disconnect', () => {
      console.log(`Bye-bye ${socket.id}`)
    })
  })
}

if (config.mongoEnabled) {
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

  server.post('/api/v1/user', (req, res) => {
    const newUser = req.body
    userModel.create(newUser)
    res.send('User added')
  })
}

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
