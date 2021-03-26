export const SAVE_CHANNEL = 'SAVE_CHANNEL'
export const GET_CHANNELS = 'GET_CHANNELS'
const GET_DIRECT = 'GET_DIRECT'
const ACTIVE_CHANNEL_ID = 'ACTIVE_CHANNEL_ID'
const SETTINGS_CHANNEL_ID = 'SETTINGS_CHANNEL_ID'
const CHANNEL_ACCESS = 'CHANNEL_ACCESS'

const initialState = {
  channelList: {},
  directList: {},
  activeChannel: '',
  settingsForChannel: '',
  temporaryRights: []
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
    case GET_DIRECT: {
      return {
        ...state,
        directList: action.directList
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
    case SETTINGS_CHANNEL_ID: {
      return {
        ...state,
        settingsForChannel: action.payload.id
      }
    }
    case CHANNEL_ACCESS: {
      return {
        ...state,
        temporaryRights: action.payload
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
      type: 'channels:get',
      payload: { uid }
    })
  }
}

export function addChannel(name, desc, privateChannel) {
  const slicedName = name[name.length - 1] === '-' ? name.slice(0, name.length - 1) : name
  const newChannel = {
    name: slicedName || 'new-channel',
    description: desc || '',
    userList: [],
    channelMessages: []
  }
  return (dispatch, getState) => {
    const uid = getState().auth.user?._id
    dispatch({
      type: 'channel:add',
      payload: { channel: newChannel, uid, privateChannel }
    })
  }
}

export function removeChannel(channelId) {
  return (dispatch, getState) => {
    const uid = getState().auth.user?._id
    dispatch({
      type: 'channel:remove',
      payload: { id: channelId, uid }
    })
  }
}

export function editChannel(id, name, desc, rights) {
  const slicedName = name[name.length - 1] === '-' ? name.slice(0, name.length - 1) : name
  const newChannel = {
    id,
    name: slicedName || 'new-channel',
    description: desc || '',
    access: rights
  }
  return (dispatch, getState) => {
    const uid = getState().auth.user?._id
    const { temporaryRights } = getState().channels
    dispatch({
      type: 'channel:edit',
      payload: { channel: { ...newChannel, userList: temporaryRights }, uid }
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

export function settingsChannel(id) {
  return ({
    type: SETTINGS_CHANNEL_ID,
    payload: { id }
  })
}

export function setTempRights(chanId) {
  return (dispatch, getState) => {
    const userList = getState().channels.channelList[chanId]?.userList
    if (userList) {
      dispatch({
        type: CHANNEL_ACCESS,
        payload: [...userList]
      })
    }
  }
}

export function setAccess(access, uid) {
  return (dispatch, getState) => {
    const { temporaryRights } = getState().channels
    const accessList = access
      ? [...temporaryRights, uid]
      : temporaryRights.filter((user) => user !== uid)
    dispatch({
      type: CHANNEL_ACCESS,
      payload: accessList
    })
  }
}
