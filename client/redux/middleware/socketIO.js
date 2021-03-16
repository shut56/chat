import { io } from 'socket.io-client'

import { history } from '..'

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
            type: 'GET_CHANNELS',
            channelList,
            channelId: activeId
          })
          break
        }
        case 'users:list': {
          // console.log('Users:', message.payload)
          dispatch({
            type: 'GET_USERS',
            users: message.payload || {}
          })
          break
        }
        case 'users:online': {
          // console.log(message.payload)
          dispatch({
            type: 'GET_USER_STATUS',
            users: { ...message.payload }
          })
          break
        }
        case 'message:history': {
          const { messageHistory } = getState().messages
          dispatch({
            type: 'GET_MESSAGES',
            msgHistory: { ...messageHistory, [message?.payload.channelId]: message?.payload.history } || {}
          })
          break
        }
        case 'server:response': {
          console.log('This is Server Response')
          dispatch({
            type: 'SERVER_RESPONSE',
            payload: message.payload
          })
          break
        }
        case 'register:complete': {
          history.push('/login')
          dispatch({
            type: 'REGISTER',
            toggle: false
          })
          socket.disconnect()
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
          socket.emit('users:get', action.payload)
          socket.emit('user:online', action.payload)
          break
        }
        case 'user:name': {
          socket.emit('user:name', action.payload)
          break
        }
        case 'user:register': {
          socket.emit(action.type, action.payload)
          break
        }
        case 'channels:get': {
          socket.emit(action.type, action.payload)
          break
        }
        case 'channel:add': {
          socket.emit(action.type, action.payload)
          break
        }
        case 'channel:remove': {
          socket.emit(action.type, action.payload)
          break
        }
        case 'messages:get': {
          socket.emit(action.type, action.payload)
          break
        }
        case 'message:add': {
          socket.emit(action.type, action.payload)
          break
        }
        case 'message:remove': {
          socket.emit(action.type, action.payload)
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
        default: {
          return next(action)
        }
      }
      return next(action)
    }
  }
}

export default socketIOMiddleware()
