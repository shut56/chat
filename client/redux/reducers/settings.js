import { nanoid } from 'nanoid'

const SAVE_CHANNEL = 'SAVE_CHANNEL'
const NEW_NAME = 'NEW_NAME'
const ACTIVE_CHANNEL_CHANGED = 'ACTIVE_CHANNEL_CHANGED'

const initialState = {
  channels: [],
  activeChannel: '',
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
    case SAVE_CHANNEL:
    case ACTIVE_CHANNEL_CHANGED: {
      return {
        ...state,
        channels: action.updatedChannels,
        activeChannel: action.channelId
      }
    }
    default: {
      return state
    }
  }
}

const updateListOfChannels = (channelsFromStore, channelId, channel) => {
  const channelList = typeof channel === 'undefined' ? [...channelsFromStore] : [...channelsFromStore, channel]
  return channelList.reduce((acc, rec) => {
    return [...acc, { ...rec, active: rec.id === channelId }]
  }, [])
}

export function saveChannel(name) {
  const newChannel = {
    id: nanoid(),
    name: name || 'new-channel',
    active: true
  }
  return (dispatch, getState) => {
    const store = getState()
    const updatedChannels = updateListOfChannels(store.settings.channels, newChannel.id, newChannel)
    dispatch({
      type: SAVE_CHANNEL,
      updatedChannels,
      channelId: newChannel.id
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

export function changeActiveChannel(channelId) {
  return (dispatch, getState) => {
    const { channels } = getState().settings
    const updatedChannels = updateListOfChannels(channels, channelId)
    dispatch({
      type: ACTIVE_CHANNEL_CHANGED,
      updatedChannels,
      channelId
    })
  }
}
