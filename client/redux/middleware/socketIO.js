import { io } from 'socket.io-client'

import { GET_CHANNELS } from '../reducers/channels'
import { GET_MESSAGES } from '../reducers/messages'
import { GET_USERS } from '../reducers/users'

const socketIOMiddleware = () => {
  console.log('- - - socketIOMiddleware is online! - - -')
  let socket

  return (store) => {
    socket = io(`${window.location.origin}`, { path: '/ws' })
    const { dispatch } = store

    socket.on('SOCKET_IO', (message) => {
      console.log('Message from server', message)
      switch (message.type) {
        case 'channel:list': {
          console.log('Get channels from socket.io', message)
          const channelList = !message.payload.id ? message.payload : message.payload.channels
          const activeId = message.payload.id || Object.keys(channelList)[0]
          dispatch({
            type: GET_CHANNELS,
            channelList,
            channelId: activeId
          })
          break
        }
        case 'users:list': {
          console.log('Users:', message.payload)
          dispatch({
            type: GET_USERS,
            users: message.payload || {}
          })
          break
        }
        case 'message:history': {
          console.log(message?.payload || [])
          dispatch({
            type: GET_MESSAGES,
            msgHistory: message?.payload || []
          })
          break
        }
        default: {
          console.log('Server Message Received')
        }
      }
    })

    return (next) => (action) => {
      switch (action.type) {
        case 'users:get': {
          socket.emit('users:get', action)
          break
        }
        case 'channels:get': {
          socket.emit('channels:get', action.payload)
          break
        }
        case 'channel:add': {
          console.log('YES! This is Channel:ADD')
          socket.emit('channel:add', action.payload)
          break
        }
        case 'channel:remove': {
          console.log(`Remove ${action.payload.id} channel`)
          socket.emit('channel:remove', action.payload)
          break
        }
        case 'messages:get': {
          socket.emit('messages:get', action.payload)
          break
        }
        case 'message:add': {
          console.log('New message ADDED!')
          socket.emit('message:add', action.payload)
          break
        }
        default: {
          return next(action)
        }
      }
      return next(action)
    }
  }
}

export default socketIOMiddleware()
