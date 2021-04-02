import { io } from 'socket.io-client'

import { history } from '..'

const socketIOMiddleware = () => {
  let socket

  function settingAccessRights(channelList, uid, role) {
    return Object
      .keys(channelList)
      .reduce((acc, chan) => {
        if (role.includes('admin') || channelList[chan]?.access === 'All' || channelList[chan]?.userList.includes(uid)) {
          return { ...acc, [chan]: { ...channelList[chan] } }
        }
        return acc
      }, {})
  }

  function checkUserChannel(channelList, uid) {
    return Object
      .keys(channelList)
      .find((chan) => channelList[chan]?.access === 'All' || channelList[chan].userList.includes(uid))
  }

  function generateDirectChannels(userList, myId) {
    return Object.keys(userList).reduce((acc, uid) => {
      return { ...acc, [uid]: { userList: [myId, uid] } }
    }, {})
  }

  return (store) => {
    socket = io(`${window.location.origin}`, {
      path: '/ws',
      autoConnect: false
    })
    const { dispatch, getState } = store

    socket.on('SOCKET_IO', (message) => {
      // console.log('Message from server', message)
      // console.log('ID: ', socket.id)
      const { _id: uid, role } = getState().auth.user
      // console.log('User ID and Role: ', uid, role)

      switch (message.type) {
        case 'channel:list': {
          // console.log('Get channels from socket.io', message)
          const channelList = settingAccessRights(message.payload.channels, uid, role)

          // console.log('COMPARE: ', message.payload?.trigger, getState().channels.activeChannel)
          // console.log('FIRST ID: ', checkUserChannel(channelList, uid))

          let activeId = checkUserChannel(channelList, uid)

          if (message.payload?.id) {
            // console.log('NEW CHAN ID: ', message.payload?.id)
            activeId = message.payload.id
          } else if (getState().channels.activeChannel !== '') {
            activeId = getState().channels.activeChannel

            if (message.payload?.trigger === activeId) {
              activeId = checkUserChannel(channelList, uid)
            }
          }

          dispatch({
            type: 'GET_CHANNELS',
            channelList,
            channelId: activeId
          })
          dispatch({
            type: 'messages:get',
            payload: { id: activeId }
          })
          break
        }
        case 'users:list': {
          // console.log('Users:', message.payload)
          const myId = getState().auth.user?._id
          dispatch({
            type: 'GET_USERS',
            users: message.payload || {}
          })
          dispatch({
            type: 'GET_DIRECT',
            directList: generateDirectChannels(message.payload || {}, myId)
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
          // console.log('This is Server Response', message.payload)
          dispatch({
            type: 'ALERT',
            payload: message.payload
          })
          if (message.payload.data?.email) {
            dispatch({
              type: 'SAVE_EMAIL',
              payload: { email: message.payload.data?.email }
            })
          }
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
          // console.log('Server Message Received')
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
        case 'user:data': {
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
        case 'channel:edit': {
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
