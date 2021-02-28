import { nanoid } from 'nanoid'

export const SAVE_CHANNEL = 'SAVE_CHANNEL'
export const ACTIVE_CHANNEL_CHANGED = 'ACTIVE_CHANNEL_CHANGED'
export const GET_CHANNELS = 'GET_CHANNELS'

const initialState = {
  channelList: {},
  channels: [],
  activeChannel: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS: {
      return {
        ...state,
        channelList: action.channelList,
        activeChannel: action.channelId
      }
    }
    case SAVE_CHANNEL:
    case ACTIVE_CHANNEL_CHANGED: {
      return {
        ...state,
        channelList: action.updatedChannelList,
        activeChannel: action.channelId
      }
    }
    default: {
      return state
    }
  }
}

export const updateListOfChannelsObj = (channelList, channelId) => {
  return Object.keys(channelList).reduce((acc, rec) => {
    return {
      ...acc,
      [rec]: { ...channelList[rec], active: channelList[rec].id === channelId }
    }
  }, {})
}

export function getChannels() {
  return (dispatch) => {
    console.log('This is getChannels')
    fetch('/api/history').then(() => console.log('Fetch to Server'))
    dispatch({
      type: 'GET_CHANNELS_FROM_SERVER'
    })
  }
}

export function saveChannel(name, desc) {
  const slicedName = name[name.length - 1] === '-' ? name.slice(0, name.length - 1) : name
  const newChannel = {
    id: nanoid(),
    name: slicedName || 'new-channel',
    description: desc || '',
    userList: [],
    channelMessages: []
  }
  return (dispatch) => {
    dispatch({
      type: 'ADD_NEW_CHANNEL',
      payload: { ...newChannel }
    })
  }
}

export function changeActiveChannel(channel) {
  return (dispatch, getState) => {
    const { channelList } = getState().channels
    const updatedChannelList = updateListOfChannelsObj(channelList, channel)
    dispatch({
      type: 'GET_MESSAGE_HISTORY_FROM_CHANNEL',
      payload: channel
    })
    dispatch({
      type: ACTIVE_CHANNEL_CHANGED,
      updatedChannelList,
      channelId: channel
    })
  }
}
