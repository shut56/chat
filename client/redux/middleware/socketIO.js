import { io } from 'socket.io-client'

import { GET_CHANNELS } from '../reducers/channels'
import { GET_MESSAGES } from '../reducers/messages'
import { GET_USERS } from '../reducers/users'

const socketIOMiddleware = () => {
  console.log('- - - socketIOMiddleware is online! - - -')
  let socket

  return (store) => {
    socket = io(`${window.location.origin}`, {
      path: '/ws',
      autoConnect: false
    })
    const { dispatch, getState } = store

    socket.on('SOCKET_IO', (message) => {
      console.log('Message from server', message)
      console.log('ID: ', socket.id)
      switch (message.type) {
        case 'channel:list': {
          console.log('Get channels from socket.io', message)
          const channelList = !message.payload.id ? message.payload : message.payload.channels
          const activeId = message.payload.id || getState().channels.activeChannel
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
        case 'users:online': {
          const { userList } = getState().users
          const users = Object.keys(userList).reduce((acc, userId) => ({ ...acc, [userId]: { ...userList[userId], status: message.payload[userId] } }), {})
          console.log(message.payload)
          dispatch({
            type: GET_USERS,
            users: { ...users }
          })
          break
        }
        case 'message:history': {
          const { messageHistory } = getState().messages
          dispatch({
            type: GET_MESSAGES,
            msgHistory: { ...messageHistory, [message?.payload.channelId]: message?.payload.history } || {}
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
        case 'user:online': {
          socket.emit('user:online', action.payload)
          break
        }
        case 'socket:open': {
          socket.connect()
          break
        }
        case 'socket:close': {
          socket.disconnect()
          break
        }
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
        case 'message:remove': {
          console.log('Message removed')
          socket.emit('message:remove', action.payload)
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
