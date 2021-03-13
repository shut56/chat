const NEW_NAME = 'NEW_NAME'
const SAVE_SCROLL_POINT = 'SAVE_SCROLL_POINT'

const initialState = {
  newChannelName: '',
  serverSettings: {
    name: 'Pepe\'s Server'
  },
  scrollPoints: {},
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
    case SAVE_SCROLL_POINT: {
      return {
        ...state,
        scrollPoints: action.payload
      }
    }
    default: {
      return state
    }
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

export function saveScrollPoint(channelId, pos) {
  return (dispatch, getState) => {
    const { scrollPoints } = getState().settings
    dispatch({
      type: SAVE_SCROLL_POINT,
      payload: { ...scrollPoints, [channelId]: pos }
    })
  }
}
