export const SAVE_CHANNEL = 'SAVE_CHANNEL'
export const GET_CHANNELS = 'GET_CHANNELS'
const ACTIVE_CHANNEL_ID = 'ACTIVE_CHANNEL_ID'

const initialState = {
  channelList: {},
  activeChannel: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNELS: {
      return {
        ...state,
        channelList: action.channelList,
        activeChannel: action.channelId || 'No active channel'
      }
    }
    case SAVE_CHANNEL: {
      return {
        ...state,
        channelList: action.newActiveChannel
      }
    }
    case ACTIVE_CHANNEL_ID: {
      return {
        ...state,
        activeChannel: action.channelId
      }
    }
    default: {
      return state
    }
  }
}

export function getChannels(uid) {
  return (dispatch) => {
    dispatch({
      type: 'users:get'
    })
    dispatch({
      type: 'channels:get',
      payload: { uid }
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

export function removeChannel(channelId) {
  return (dispatch, getState) => {
    const fistChannelId = Object.keys(getState().channels.channelList)[0]
    dispatch({
      type: 'channel:remove',
      payload: { id: channelId, fistChannelId }
    })
    dispatch({
      type: ACTIVE_CHANNEL_ID,
      channelId: fistChannelId
    })
  }
}

export function changeActiveChannel(channelId) {
  return (dispatch) => {
    dispatch({
      type: ACTIVE_CHANNEL_ID,
      channelId
    })
    dispatch({
      type: 'messages:get',
      payload: { id: channelId }
    })
  }
}
