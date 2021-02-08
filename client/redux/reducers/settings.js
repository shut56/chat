import { nanoid } from 'nanoid'
import { io } from 'socket.io-client'

const SAVE_CHANNEL = 'SAVE_CHANNEL'
const NEW_NAME = 'NEW_NAME'
const ACTIVE_CHANNEL_CHANGED = 'ACTIVE_CHANNEL_CHANGED'
const GET_CHANNELS = 'GET_CHANNELS'

const initialState = {
  channels: [],
  activeChannel: '',
  newChannelName: '',
  serverSettings: {
    name: 'Pepe\'s Server'
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
    case GET_CHANNELS: {
      return {
        ...state,
        channels: action.channels,
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

const updateListOfChannels = (channelList, channelId) => {
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
  return (dispatch) => {
    socket.emit('addChannel', { ...newChannel })
    socket.on('channelList', (channelList) => {
      console.log('Message from server.', channelList)
      const updatedChannels = updateListOfChannels(channelList, newChannel.id)
      dispatch({
        type: SAVE_CHANNEL,
        updatedChannels,
        channelId: newChannel.id
      })
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

export function getChannels() {
  return (dispatch, getStore) => {
    const store = getStore()
    socket.on('channelListForUser', (channelList) => {
      const createdChannels = channelList.reduce((acc, rec) => {
        return {
          ...acc,
          [rec.id]: {
            name: rec.name,
            // description: '',
            userList: [],
            channelMessages: []
          }
        }
      }, {})
      store.channels.channelList = createdChannels
      dispatch({
        type: GET_CHANNELS,
        channels: channelList,
        channelId: channelList[0]?.id || ''
      })
    })
  }
}
