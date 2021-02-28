import { io } from 'socket.io-client'

import {
  GET_CHANNELS, SAVE_CHANNEL, updateListOfChannelsObj
} from '../reducers/channels'
import {
  GET_MESSAGES, // SET_NICK_NAME
} from '../reducers/messages'

const actionTypes = [
  'GET_CHANNELS_FROM_SERVER',
  'ADD_NEW_CHANNEL',
  'GET_MESSAGE_HISTORY_FROM_CHANNEL',
  'SEND_NEW_MESSAGE',
  'SET_NAME'
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
        case 'GET_CHANNELS_FROM_SERVER': {
          console.log('Get channels from socket.io')
          dispatch({
            type: GET_CHANNELS,
            channelList: message.payload,
            channelId: 'test-id'
          })
          break
        }
        case 'GET_MESSAGE_HISTORY_FROM_CHANNEL':
        case 'SEND_NEW_MESSAGE': {
          dispatch({
            type: GET_MESSAGES,
            msgHistory: message.payload
          })
          break
        }
        case 'ADD_NEW_CHANNEL': {
          const { channels, id } = message.payload
          const updatedChannelList = updateListOfChannelsObj(channels, id)
          dispatch({
            type: SAVE_CHANNEL,
            updatedChannelList,
            channelId: id
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
      }
      return next(action)
    }
  }
}

export default socketIOMiddleware()
