const FADE_FOR_WINDOWS = 'FADE_FOR_WINDOWS'

const initialState = {
  blackScreen: false,
  channelCreatorToggle: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FADE_FOR_WINDOWS: {
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

export function fade(toggle) {
  return ({
    type: FADE_FOR_WINDOWS,
    toggle
  })
}
