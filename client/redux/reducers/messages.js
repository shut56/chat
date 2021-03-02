export const GET_MESSAGES = 'GET_MESSAGES'
export const SET_NICK_NAME = 'SET_NICK_NAME'

const initialState = {
  messageHistory: [],
  nickname: 'Pepe'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES: {
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

export function sendMessage(chan, usrMsg) {
  return (dispatch, getState) => {
    const { nickname } = getState().messages
    const message = usrMsg.trim()

    if (message.length > 0) {
      dispatch({
        type: 'SEND_NEW_MESSAGE',
        payload: { channel: chan, name: nickname, text: message }
      })
    }
  }
}

export function setNickname(name) {
  return (dispatch) => {
    dispatch({
      type: 'SET_NAME',
      payload: name.trim() || 'User'
    })
  }
}
