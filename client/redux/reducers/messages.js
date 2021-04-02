export const GET_MESSAGES = 'GET_MESSAGES'
export const SET_NICK_NAME = 'SET_NICK_NAME'

const initialState = {
  messageHistory: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES: {
      return {
        ...state,
        messageHistory: action.msgHistory
      }
    }
    default:
      return state
  }
}

export function sendMessage(chan, usrMsg) {
  return (dispatch, getState) => {
    const { _id: uid } = getState().auth.user
    const message = usrMsg.trim()

    if (message.length > 0) {
      dispatch({
        type: 'message:add',
        payload: { id: chan, message: { uid, text: message } }
      })
    }
  }
}

export function removeMessage(chanId, msgId) {
  return (dispatch) => dispatch({
    type: 'message:remove',
    payload: { channelId: chanId, messageId: msgId }
  })
}
