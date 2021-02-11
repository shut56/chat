import { io } from 'socket.io-client'

export const GET_MESSAGES = 'GET_MESSAGES'
const SEND_MESSAGE = 'SEND_MESSAGE'
const SET_NICK_NAME = 'SET_NICK_NAME'

// const message = {
//   userId: 1,
//   id: bnjJH31,
//   text: '',
//   time: '2021-01-01-16-00-00',
//   meta: {}
// }

const initialState = {
  messageHistory: [],
  nickname: 'Pepe'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
    case SEND_MESSAGE: {
      return {
        ...state,
        messageHistory: action.msgHistory
      }
    }
    case SET_NICK_NAME: {
      return {
        ...state,
        nickname: action.name
      }
    }
    default:
      return state
  }
}

let socket
if (SOCKETS_ENABLE === true) {
  // eslint-disable-next-line
  socket = io(`${window.location.origin}`, {
    path: '/ws'
  })
}

export function getMessageHistory(chan) {
  return (dispatch) => {
    socket.emit('getMessageHistoryFromChannel', { channel: chan })
    socket.on('messageHistory', (channelHistory) => {
      console.log('getMessageHistory(chan)')
      dispatch({
        type: GET_MESSAGES,
        msgHistory: channelHistory
      })
    })
  }
}

export function sendMessage(chan, usrMsg) {
  return (dispatch, getState) => {
    const { nickname } = getState().messages
    const message = usrMsg.trim()

    if (message.length > 0) {
      socket.emit('newMessage', { channel: chan, name: nickname, text: message })
      socket.on('messageHistory', (channelHistory) => {
        console.log('sendMessage(chan, usrMsg)')
        dispatch({
          type: SEND_MESSAGE,
          msgHistory: channelHistory
        })
      })
    }
  }
}

export function setNickname(name) {
  return (dispatch) => {
    socket.emit('setName', name.trim() || 'User')
    socket.on('setName', (userName) => {
      dispatch({
        type: SET_NICK_NAME,
        name: userName
      })
    })
  }
}
