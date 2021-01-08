import { nanoid } from 'nanoid'

const SAVE_CHANNEL = 'SAVE_CHANNEL'
const NEW_NAME = 'NEW_NAME'

const initialState = {
  // channels: [{ name: 'general', id: 'channelId' }],
  channels: [],
  newChannelName: '',
  serverSettings: {
    name: 'Server'
  },
  userAmount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_NAME: {
      return {
        ...state,
        newChannelName: action.char
      }
    }
    case SAVE_CHANNEL: {
      return {
        ...state,
        channels: action.updatedChannels
      }
    }
    default: {
      return state
    }
  }
}

export function saveChannel(name) {
  const newChannel = {
    id: nanoid(),
    name: name || 'new-channel'
  }
  return (dispatch, getState) => {
    const store = getState()
    const updatedChannels = [...store.settings.channels, newChannel]
    dispatch({
      type: SAVE_CHANNEL,
      updatedChannels
    })
  }
}

export function setNewChannelName(name = '') {
  return (dispatch) => {
    if (/^(\w+[\w -]+\w+)$|(^\w*)$/gi.test(name)) {
      dispatch({
        type: NEW_NAME,
        char: name.toLowerCase().replace(/\s/g, '-')
      })
    }
  }
}
