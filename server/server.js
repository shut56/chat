const { resolve } = require('path')

import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
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

import Html from '../client/html'

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

const middleware = [
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist')),
  favicon(`${__dirname}/public/favicon.ico`),
  passport.initialize()
]

middleware.forEach((it) => server.use(it))

passport.use('jwt', passportJWT.jwt)

server.get('/api/v1/users', (req, res) => {
  res.json(connectedUsers.users())
})

let adminList = []

const originAdmin = async () => {
  const admins = await userModel.find({ role: ['admin'] })
  const res = admins.find((admin) => admin.origin === 'first' )
  if (typeof res === 'undefined') {
    // console.log('No one origin admin...')
    const firstAdmin = await userModel.create({
      name: 'Admin',
      email: 'admin2@admin',
      password: 'admin',
      role: ['admin'],
      origin: 'first'
    })
    // console.log('Admin created')
    adminList = [firstAdmin._id.toString()]
  } else {
    // console.log('Admin is here!')
  }
  adminList = [...adminList, ...admins.map((admin) => admin._id.toString())]
  // console.log('Admins: ', adminList)
}

if (config.mongoEnabled) {
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()
  originAdmin()

  mongoRequests(server)
}

function isOnline() {
  let users = {}
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
    console.log(`${socket.id} login`)

    userHandlers(socketIO, socket, connectedUsers)
    channelHandlers(socketIO, socket)
    messageHandlers(socketIO, socket)

    socket.on('user:online', ({ id }) => {
      connectedUsers.add(socket.id, id)

      socketIO.emit('SOCKET_IO', {
        type: 'users:online',
        payload: connectedUsers.users()
      })
    })

    socket.on('disconnect', () => {
      console.log(`${socket.id} logout`)
      connectedUsers.remove(socket.id)

      socketIO.emit('SOCKET_IO', {
        type: 'users:online',
        payload: connectedUsers.users()
      })
    })
  })
}

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
