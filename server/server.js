import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import io from 'socket.io'
import passport from 'passport'

import config from './config'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import socketHandlers from './handlers/socketHandlers'
import userHandlers from './handlers/userHandlers'
import channelHandlers from './handlers/channelHandlers'
import messageHandlers from './handlers/messageHandlers'
import mongoRequests from './mongodb/requests'

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
let channels = [
  {
    id: 'test-id',
    name: 'general',
    userList: [],
    active: true
  },
  {
    id: 'test-2',
    name: 'pepe-chill',
    userList: [],
    active: false
  },
  {
    id: 'test-3',
    name: '​froggy_swamp',
    userList: [],
    active: false
  }
]
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

server.get('/api/users', (req, res) => {
  res.json(connectedUsers.users())
})

function isOnline() {
  let users = {
    'test-user-id': {
      id: 'test-user-id',
      email: 'test@test.com',
      name: 'testUser',
      soketId: 'test-user-socket-id'
    }
  }
  return {
    add(usr) {
      const { id, email, name, channels } = usr
      users[usr.id] = { id, email, name, channels }
    },
    remove(userId) {
      delete users[userId]
    },
    users() {
      return users
    }
  }
}

const connectedUsers = isOnline()

if (config.mongoEnabled) {
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()

  mongoRequests(server)
}

if (config.socketsEnabled) {
  console.log('Sockets Enabled: ', config.socketsEnabled)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`Hello ${socket.id}`)

    userHandlers(socketIO, socket)
    channelHandlers(socketIO, socket)
    messageHandlers(socketIO, socket)
    socketHandlers(socketIO, socket, msgHist, channels)

    socket.on('disconnect', () => {
      console.log(`Bye-bye ${socket.id}`)
    })
  })
}

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
