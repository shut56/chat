export const ADMIN_RIGHTS = 'ADMIN_RIGHTS'
const CHANNEL_CREATOR_ON = 'CHANNEL_CREATOR_ON'
const CHANNEL_SETTINGS_ON = 'CHANNEL_SETTINGS_ON'
const UPDATE_EMAIL_ON = 'UPDATE_EMAIL_ON'
const UPDATE_PASSWORD_ON = 'UPDATE_PASSWORD_ON'
const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
const REMOVE_CHANNEL = 'REMOVE_CHANNEL'
const CLOSE_WINDOWS = 'CLOSE_WINDOWS'
const POP_UP = 'POP_UP'

const initialState = {
  isAdmin: false,
  toggles: {
    channelCreator: false,
    channelSettings: false,
    updateEmail: false,
    updatePassoword: false,
    removeMessage: false,
    removeChannel: false,
  },
  popUpActive: false,
  temp: {}
}

function closeAllWindows (toggles) {
  return Object.keys(toggles).reduce((acc, toggle) => {
    return { ...acc, [toggle]: false }
  }, {})
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_CREATOR_ON: {
      return {
        ...state,
        toggles: {
          ...state.toggles,
          channelCreator: action.toggle
        }
      }
    }
    case CHANNEL_SETTINGS_ON: {
      return {
        ...state,
        toggles: {
          ...state.toggles,
          channelSettings: action.toggle
        }
      }
    }
    case UPDATE_EMAIL_ON: {
      return {
        ...state,
        toggles: {
          ...state.toggles,
          updateEmail: action.toggle
        }
      }
    }
    case UPDATE_PASSWORD_ON: {
      return {
        ...state,
        toggles: {
          ...state.toggles,
          updatePassoword: action.toggle
        }
      }
    }
    case REMOVE_MESSAGE: {
      return {
        ...state,
        toggles: {
          ...state.toggles,
          removeMessage: action.toggle
        },
        temp: action.payload
      }
    }
    case REMOVE_CHANNEL: {
      return {
        ...state,
        toggles: {
          ...state.toggles,
          removeChannel: action.toggle
        }
      }
    }
    case ADMIN_RIGHTS: {
      return {
        ...state,
        isAdmin: action.rights
      }
    }
    case POP_UP: {
      return {
        ...state,
        popUpActive: action.active
      }
    }
    case CLOSE_WINDOWS: {
      return {
        ...state,
        toggles: closeAllWindows(state.toggles),
        temp: {}
      }
    }
    default: {
      return state
    }
  }
}

export function openWindow(toggle, type, payload) {
  switch (type) {
    case 'create': {
      return ({
        type: CHANNEL_CREATOR_ON,
        toggle
      })
    }
    case 'edit': {
      return ({
        type: CHANNEL_SETTINGS_ON,
        toggle
      })
    }
    case 'updateEmail': {
      return ({
        type: UPDATE_EMAIL_ON,
        toggle
      })
    }
    case 'updatePassword': {
      return ({
        type: UPDATE_PASSWORD_ON,
        toggle
      })
    }
    case 'removeMessage': {
      return ({
        type: REMOVE_MESSAGE,
        toggle,
        payload
      })
    }
    case 'removeChannel': {
      return ({
        type: REMOVE_CHANNEL,
        toggle
      })
    }
    default: {
      console.log('Close')
      return ({
        type: CLOSE_WINDOWS
      })
    }
  }
}

export function setPopUpActive(active) {
  return ({
    type: POP_UP,
    active
  })
}
