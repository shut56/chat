const FADE_FOR_WINDOWS = 'FADE_FOR_WINDOWS'
export const ADMIN_RIGHTS = 'ADMIN_RIGHTS'

const initialState = {
  blackScreen: false,
  channelCreatorToggle: false,
  isAdmin: false
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
    case ADMIN_RIGHTS: {
      return {
        ...state,
        isAdmin: action.rights
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
