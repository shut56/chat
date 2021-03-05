export const SAVE_CHANNEL = 'SAVE_CHANNEL'
export const ACTIVE_CHANNEL = 'ACTIVE_CHANNEL'
export const GET_CHANNELS = 'GET_CHANNELS'

const initialState = {
  channelList: {},
  // channels: [],
  activeChannel: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS: {
      return {
        ...state,
        channelList: action.channelList,
        activeChannel: action.channelId || ''
      }
    }
    case SAVE_CHANNEL:
    case ACTIVE_CHANNEL: {
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

export function getChannels() {
  return (dispatch) => {
    dispatch({
      type: 'users:get'
    })
    dispatch({
      type: 'channels:get'
    })
  }
}

export function saveChannel(name, desc) {
  const slicedName = name[name.length - 1] === '-' ? name.slice(0, name.length - 1) : name
  const newChannel = {
    name: slicedName || 'new-channel',
    description: desc || '',
    userList: [],
    channelMessages: []
  }
  return (dispatch) => {
    dispatch({
      type: 'channel:add',
      payload: { ...newChannel }
    })
  }
}

export const updateListOfChannels = (channelList, channelId) => {
  return Object.keys(channelList).reduce((acc, rec) => {
    return {
      ...acc,
      [rec]: { ...channelList[rec], active: channelList[rec]._id === channelId }
    }
  }, {})
}

export function changeActiveChannel(channelId) {
  return (dispatch, getState) => {
    console.log(channelId)
    const { channelList } = getState().channels
    const updatedChannelList = updateListOfChannels(channelList, channelId)
    dispatch({
      type: 'messages:get',
      payload: { id: channelId }
    })
    dispatch({
      type: ACTIVE_CHANNEL,
      updatedChannelList,
      channelId
    })
  }
}

export function removeChannel(channelId) {
  return (dispatch) => {
    console.log(channelId)
    dispatch({
      type: 'channel:remove',
      payload: { id: channelId }
    })
  }
}
