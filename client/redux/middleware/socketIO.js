import { io } from 'socket.io-client'

import {
  GET_CHANNELS
} from '../reducers/channels'
import {
  GET_MESSAGES
} from '../reducers/messages'
import {
  GET_USERS
} from '../reducers/users'

const actionTypes = [
  'ADD_NEW_CHANNEL',
  'GET_MESSAGE_HISTORY_FROM_CHANNEL',
  'SEND_NEW_MESSAGE',
  'SET_NAME',
]

const socketIOMiddleware = () => {
  console.log('- - - socketIOMiddleware is online! - - -')
  let socket

  return (store) => {
    socket = io(`${window.location.origin}`, { path: '/ws' })
    const { dispatch } = store

    socket.on('SOCKET_IO', (message) => {
      console.log('getChannels', message)
      switch (message.type) {
        case 'channel:list': {
          console.log('Get channels from socket.io', message)
          const channelList = !message.payload.id ? message.payload : message.payload.channels
          dispatch({
            type: GET_CHANNELS,
            channelList,
            channelId: message.payload.id || ''
          })
          break
        }
        case 'GET_MESSAGE_HISTORY_FROM_CHANNEL': {
          break
        }
        case 'users:list': {
          const users = message.payload.map((uid) => ({ id: uid }))
          dispatch({
            type: GET_USERS,
            users
          })
          break
        }
        case 'message:history': {
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
      if (actionTypes.includes(action.type)) {
        socket.emit('SOCKET_SEND', action)
        return next(action)
      }
      switch (action.type) {
        case 'users:get': {
          socket.emit('users:get', action)
          break
        }
        case 'channels:get': {
          socket.emit('channels:get', action)
          break
        }
        case 'channel:add': {
          console.log('YES! This is Channel:ADD')
          socket.emit('channel:add', action.payload)
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
      // if (testActionTypes.includes(action.type)) {
      //   socket.emit('users:get', action)
      //   return next(action)
      // }
      // if (testActionTypes.includes(action.type)) {
      //   console.log('DING-DING')
      //   socket.emit('channels:get', action)
      //   return next(action)
      // }
      return next(action)
    }
  }
}

export default socketIOMiddleware()
