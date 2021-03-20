const CHANNEL_CREATOR_ON = 'CHANNEL_CREATOR_ON'
const CHANNEL_SETTINGS_ON = 'CHANNEL_SETTINGS_ON'
const CLOSE_WINDOWS = 'CLOSE_WINDOWS'
export const ADMIN_RIGHTS = 'ADMIN_RIGHTS'

const initialState = {
  blackScreen: false,
  channelCreatorToggle: false,
  channelSettingsToggle: false,
  isAdmin: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_CREATOR_ON: {
      return {
        ...state,
        channelCreatorToggle: action.toggle,
      }
    }
    case CHANNEL_SETTINGS_ON: {
      return {
        ...state,
        channelSettingsToggle: action.toggle
      }
    }
    case ADMIN_RIGHTS: {
      return {
        ...state,
        isAdmin: action.rights
      }
    }
    case CLOSE_WINDOWS: {
      return {
        ...state,
        channelCreatorToggle: false,
        channelSettingsToggle: false
      }
    }
    default: {
      return state
    }
  }
}

export function openWindow(toggle, type) {
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
    default: {
      console.log('Unknown type')
      return ({
        type: CLOSE_WINDOWS
      })
    }
  }
}
