import { io } from 'socket.io-client'

const GET_MESSAGES = 'GET_MESSAGES'
const SEND_MESSAGE = 'SEND_MESSAGE'
const CURRENT_MESSAGE = 'CURRENT_MESSAGE'
const SET_NICK_NAME = 'SET_NICK_NAME'

const initialState = {
  messageHistory: [],
  userMessage: '',
  nickname: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
    case SEND_MESSAGE: {
      return {
        ...state,
        messageHistory: action.msgHistory,
        userMessage: action.message
      }
    }
    case CURRENT_MESSAGE: {
      return {
        ...state,
        userMessage: action.message
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

export function getMessageHistory() {
  return (dispatch) => {
    socket.on('messageHistory', (arg) => {
      dispatch({
        type: GET_MESSAGES,
        msgHistory: arg
      })
    })
  }
}

export function sendMessage() {
  return (dispatch, getState) => {
    const { userMessage, nickname } = getState().messages
    const message = userMessage.trim()

    if (message.length > 0) {
      socket.emit('newMessage', { name: nickname, text: message })
      socket.on('messageHistory', (arg) => {
        dispatch({
          type: SEND_MESSAGE,
          msgHistory: arg,
          message: ''
        })
      })
    }
  }
}

export function getCurrentMessage(message) {
  return ({
    type: CURRENT_MESSAGE,
    message
  })
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
