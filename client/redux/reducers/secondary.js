const CHANNEL_CREATOR_ON = 'CHANNEL_CREATOR_ON'
const CHANNEL_SETTINGS_ON = 'CHANNEL_SETTINGS_ON'
const UPDATE_EMAIL_ON = 'UPDATE_EMAIL_ON'
const UPDATE_PASSWORD_ON = 'UPDATE_PASSWORD_ON'
const CLOSE_WINDOWS = 'CLOSE_WINDOWS'
export const ADMIN_RIGHTS = 'ADMIN_RIGHTS'

const initialState = {
  channelCreatorToggle: false,
  channelSettingsToggle: false,
  updateEmailToggle: false,
  updatePassowordToggle: false,
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
    case UPDATE_EMAIL_ON: {
      return {
        ...state,
        updateEmailToggle: action.toggle
      }
    }
    case UPDATE_PASSWORD_ON: {
      return {
        ...state,
        updatePassowordToggle: action.toggle
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
        channelSettingsToggle: false,
        updateEmailToggle: false,
        updatePassowordToggle: false
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
    default: {
      console.log('Close')
      return ({
        type: CLOSE_WINDOWS
      })
    }
  }
}
