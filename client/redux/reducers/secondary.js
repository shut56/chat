const CREATE_CHANNEL = 'CREATE_CHANNEL'

const initialState = {
  blackScreen: false,
  channelCreatorToggle: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CHANNEL: {
      return {
        ...state,
        blackScreen: action.toggle,
        channelCreatorToggle: action.toggle
      }
    }
    default: {
      return state
    }
  }
}

export function createChannel(toggle) {
  return ({
    type: CREATE_CHANNEL,
    toggle
  })
}
