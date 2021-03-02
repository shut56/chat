const NEW_NAME = 'NEW_NAME'

const initialState = {
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
