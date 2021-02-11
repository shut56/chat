import { nanoid } from 'nanoid'
import { io } from 'socket.io-client'

import { GET_MESSAGES } from './messages'

const SAVE_CHANNEL = 'SAVE_CHANNEL'
const ACTIVE_CHANNEL_CHANGED = 'ACTIVE_CHANNEL_CHANGED'
const GET_CHANNELS = 'GET_CHANNELS'

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

let socket
if (SOCKETS_ENABLE === true) {
  // eslint-disable-next-line
  socket = io(`${window.location.origin}`, {
    path: '/ws'
  })
}

export function getChannels() {
  return (dispatch) => {
    socket.on('channelListForUser', (channelList) => {
      dispatch({
        type: GET_CHANNELS,
        channelList,
        channelId: 'test-id'
      })
    })
  }
}

const updateListOfChannelsObj = (channelList, channelId) => {
  return Object.keys(channelList).reduce((acc, rec) => {
    return {
      ...acc,
      [rec]: { ...channelList[rec], active: channelList[rec].id === channelId }
    }
  }, {})
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
    socket.emit('addChannel', { ...newChannel })
    socket.on('channelList', (channelList) => {
      console.log('Message from server.', channelList)
      const updatedChannelList = updateListOfChannelsObj(channelList, newChannel.id)
      dispatch({
        type: SAVE_CHANNEL,
        updatedChannelList,
        channelId: newChannel.id
      })
    })
  }
}

export function changeActiveChannel(channelId) {
  return (dispatch, getState) => {
    const { channelList } = getState().channels
    const updatedChannelList = updateListOfChannelsObj(channelList, channelId)
    socket.emit('getMessageHistoryFromChannel', { channel: channelId })
    socket.on('messageHistory', (arg) => {
      dispatch({
        type: GET_MESSAGES,
        msgHistory: arg
      })
    })
    dispatch({
      type: ACTIVE_CHANNEL_CHANGED,
      updatedChannelList,
      channelId
    })
  }
}
