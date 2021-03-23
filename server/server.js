import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import io from 'socket.io'
import passport from 'passport'

import config from './config'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import userHandlers from './handlers/userHandlers'
import channelHandlers from './handlers/channelHandlers'
import messageHandlers from './handlers/messageHandlers'
import mongoRequests from './mongodb/requests'
import userModel from './mongodb/models/userModel'

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

const middleware = [
  express.json({ limit: '50kb' }),
  cookieParser(),
  passport.initialize()
]

middleware.forEach((it) => server.use(it))

server.use('/static', express.static(`${__dirname}/public`))
passport.use('jwt', passportJWT.jwt)

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

let adminList = []

const originAdmin = async () => {
  const admins = await userModel.find({ role: ['admin'] })
  const res = admins.find((admin) => admin.origin === 'first' )
  if (typeof res === 'undefined') {
    console.log('No one origin admin...')
    const firstAdmin = await userModel.create({
      name: 'Admin',
      email: 'admin2@admin',
      password: 'admin',
      role: ['admin'],
      origin: 'first'
    })
    console.log('Admin created')
    adminList = [firstAdmin._id.toString()]
  } else {
    console.log('Admin is here!')
  }
  adminList = [...adminList, ...admins.map((admin) => admin._id.toString())]
  console.log('Admins: ', adminList)
}

if (config.mongoEnabled) {
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()
  originAdmin()

  mongoRequests(server)
}

function isOnline() {
  let users = {
    'test-user-socket-id': 'test-user-id'
  }
  return {
    add(socketId, uid) {
      users[socketId] = uid
    },
    remove(socketId) {
      delete users[socketId]
    },
    users() {
      const userList = Object.keys(users).reduce((acc, userSocketId) => ({ ...acc, [users[userSocketId]]: userSocketId }), {})
      return userList
    },
    getUser(socketId) {
      return users[socketId]
    }
  }
}

const connectedUsers = isOnline()

if (config.socketsEnabled) {
  console.log('Sockets Enabled: ', config.socketsEnabled)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`Hello ${socket.id}`)

    userHandlers(socketIO, socket, connectedUsers)
    channelHandlers(socketIO, socket)
    messageHandlers(socketIO, socket)

    socket.on('user:online', ({ id }) => {
      console.log('server.js - user:online', { id })
      connectedUsers.add(socket.id, id)

      socketIO.emit('SOCKET_IO', {
        type: 'users:online',
        payload: connectedUsers.users()
      })
    })

    socket.on('disconnect', () => {
      console.log(`Bye-bye ${socket.id}`)
      connectedUsers.remove(socket.id)

      socketIO.emit('SOCKET_IO', {
        type: 'users:online',
        payload: connectedUsers.users()
      })
    })
  })
}

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
