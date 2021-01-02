const SEND_MESSAGE = 'SEND_MESSAGE'

const initialState = {
  messageHistory: [
    {
      name: 'Test user',
      text: 'Test message'
    }
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        messageHistory: action.msgHistory
      }
    }
    default:
      return state
  }
}

export function sendMessage(message) {
  return (dispatch, getState) => {
    const store = getState()
    const msgHistory = [...store.messages.messageHistory, message]
    dispatch({
      type: SEND_MESSAGE,
      msgHistory
    })
  }
}
