const ADD_NEW_CHANNEL = 'ADD_NEW_CHANNEL'

const initialState = {
  channelList: {}
}

// const message = {
//   userId: 1,
//   id: bnjJH31,
//   text: '',
//   time: '2021-01-01-16-00-00',
//   meta: {}
// }

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_CHANNEL: {
      return {
        ...state,
        channelList: action.createdChannels
      }
    }
    default: {
      return state
    }
  }
}

export function addNewChannel(chanObj) {
  return (dispatch, getState) => {
    const store = getState()
    const createdChannels = store.settings.channels.reduce((acc, rec) => {
      console.log('rec.id', rec.id)
      return {
        ...acc,
        [rec.id]: {
          name: rec.name,
          description: chanObj?.description || '',
          userList: [],
          channelMessages: []
        }
      }
    }, {})
    console.log('createdChannels: ', createdChannels)
    dispatch({
      type: ADD_NEW_CHANNEL,
      createdChannels
    })
  }
}
