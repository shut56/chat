import { io } from 'socket.io-client'

import {
  GET_CHANNELS, SAVE_CHANNEL, updateListOfChannelsObj
} from '../reducers/channels'
import {
  GET_MESSAGES, SEND_MESSAGE, SET_NICK_NAME
} from '../reducers/messages'

const socketIOMiddleware = () => {
  console.log('- - - socketIOMiddleware is online! - - -')
  let socket

  return (store) => {
    socket = io(`${window.location.origin}`, { path: '/ws' })
    const { dispatch } = store

    socket.on('messageHistory', (message) => {
      dispatch({
        type: 'SOCKET_MESSAGE_RECEIVED',
        payload: message
      })
      console.log('Message Received')
    })

    return (next) => (action) => {
      switch (action.type) {
        case 'GET_CHANNELS_FROM_SERVER': {
          socket.emit(action.type)
          socket.on('channelListForUser', (channelList) => {
            console.log('Get channels from socket.io')
            dispatch({
              type: GET_CHANNELS,
              channelList,
              channelId: 'test-id'
            })
          })
          break
        }
        case 'ADD_NEW_CHANNEL': {
          socket.emit(action.type, action.payload)
          socket.on('channelList', (channelList) => {
            console.log(action.payload)
            const newChannel = action.payload
            const updatedChannelList = updateListOfChannelsObj(channelList, newChannel.id)
            dispatch({
              type: SAVE_CHANNEL,
              updatedChannelList,
              channelId: newChannel.id
            })
          })
          break
        }
        case 'GET_MESSAGE_HISTORY_FROM_CHANNEL': {
          socket.emit(action.type, action.payload)
          socket.on('messageHistory', (arg) => {
            dispatch({
              type: GET_MESSAGES,
              msgHistory: arg
            })
          })
          break
        }
        case 'SEND_NEW_MESSAGE': {
          socket.emit(action.type, action.payload)
          socket.on('messageHistory', (channelHistory) => {
            dispatch({
              type: SEND_MESSAGE,
              msgHistory: channelHistory
            })
          })
          break
        }
        case 'SET_NAME': {
          socket.emit(action.type, action.payload)
          socket.on('setName', (userName) => {
            dispatch({
              type: SET_NICK_NAME,
              name: userName
            })
          })
          break
        }
        default:
          return next(action)
      }
      return next(action)
    }
  }
}

export default socketIOMiddleware()
