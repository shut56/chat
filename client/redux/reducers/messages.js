import { io } from 'socket.io-client'

const GET_MESSAGES = 'GET_MESSAGES'
const SEND_MESSAGE = 'SEND_MESSAGE'
const CURRENT_MESSAGE = 'CURRENT_MESSAGE'

const initialState = {
  messageHistory: [],
  userMessage: ''
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
    case CURRENT_MESSAGE: {
      return {
        ...state,
        userMessage: action.message
      }
    }
    default:
      return state
  }
}

let socket
if (SOCKETS_ENABLE || false) {
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

export function sendMessage(message) {
  return (dispatch) => {
    socket.emit('newMessage', message)
    socket.on('messageHistory', (arg) => {
      dispatch({
        type: SEND_MESSAGE,
        msgHistory: arg
      })
    })
  }
}

export function getCurrentMessage(message) {
  return ({
    type: CURRENT_MESSAGE,
    message
  })
}
