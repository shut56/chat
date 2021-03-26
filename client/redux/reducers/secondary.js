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
  channelCreatorToggle: false,
  channelSettingsToggle: false,
  updateEmailToggle: false,
  updatePassowordToggle: false,
  removeMessageToggle: false,
  removeChannelToggle: false,
  popUpActive: false,
  temp: {}
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
    case REMOVE_MESSAGE: {
      return {
        ...state,
        removeMessageToggle: action.toggle,
        temp: action.payload
      }
    }
    case REMOVE_CHANNEL: {
      return {
        ...state,
        removeChannelToggle: action.toggle
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
        channelCreatorToggle: false,
        channelSettingsToggle: false,
        updateEmailToggle: false,
        updatePassowordToggle: false,
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
