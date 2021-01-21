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
  const slicedName = name[name.length - 1] === '-' ? name.slice(0, name.length - 1) : name
  const newChannel = {
    id: nanoid(),
    name: slicedName || 'new-channel',
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
    const regEx = /^\w+([ -](?=\w)|\w*)*([ -]{1}|\w*)$|^\w*$/gi
    if (regEx.test(name)) {
      const clearName = name.toLowerCase().replace(/\s/g, '-')
      dispatch({
        type: NEW_NAME,
        char: clearName
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
