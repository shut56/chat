const NEW_NAME = 'NEW_NAME'
const NEW_DESCRIPTION = 'NEW_DESCRIPTION'
const UPDATE_RIGHTS = 'UPDATE_RIGHTS'
const SAVE_SCROLL_POINT = 'SAVE_SCROLL_POINT'
const ACTIVE_ITEM = 'ACTIVE_ITEM'

const initialState = {
  newChannelName: '',
  newChannelDescription: '',
  accessRights: '',
  serverSettings: {
    name: 'Pepe\'s Server'
  },
  channelSettings: {
    menuItems: {
      main: {
        name: 'Main',
      },
      rights: {
        name: 'Rigths',
      }
    }
  },
  activeMenuItem: '',
  scrollPoints: {},
  userAmount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_NAME: {
      return {
        ...state,
        newChannelName: action.name
      }
    }
    case NEW_DESCRIPTION: {
      return {
        ...state,
        newChannelDescription: action.desc
      }
    }
    case UPDATE_RIGHTS: {
      return {
        ...state,
        accessRights: action.rights
      }
    }
    case SAVE_SCROLL_POINT: {
      return {
        ...state,
        scrollPoints: action.payload
      }
    }
    case ACTIVE_ITEM: {
      return {
        ...state,
        activeMenuItem: action.itemId
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
        name: clearName
      })
    }
  }
}

export function setNewChannelDescription(desc = '') {
  return (dispatch) => dispatch({
    type: NEW_DESCRIPTION,
    desc
  })
}

export function setAccessRights(rights = '') {
  return (dispatch) => dispatch({
    type: UPDATE_RIGHTS,
    rights
  })
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

export function changeActiveItem(itemId) {
  return (dispatch) => {
    dispatch({
      type: ACTIVE_ITEM,
      itemId
    })
  }
}
