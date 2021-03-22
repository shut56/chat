import { SAVE_NAME } from './auth'

const SERVER_RESPONSE = 'SERVER_RESPONSE'
const MY_ACCOUNT = 'MY_ACCOUNT'
const ACTIVE_ITEM = 'ACTIVE_ITEM'

const initialState = {
  menuItems: {
    myAccount: {
      toggle: true,
      name: 'My Account',
      userName: '',
      email: '',
      password: ''
    },
    notifications: {
      toggle: false,
      name: 'Notifications',
      popUp: false
    }
  },
  activeItem: 'myAccount',
  response: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MY_ACCOUNT: {
      return {
        ...state,
        myAccount: action.payload
      }
    }
    case ACTIVE_ITEM: {
      return {
        ...state,
        activeItem: action.itemId
      }
    }
    case SERVER_RESPONSE: {
      return {
        ...state,
        response: action.payload
      }
    }
    default: {
      return state
    }
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

export function clearResponse() {
  return ({
    type: SERVER_RESPONSE,
    payload: {}
  })
}

export function changeName(uid, name) {
  return (dispatch) => {
    dispatch({
      type: SAVE_NAME,
      payload: { name }
    })
    dispatch({
      type: 'user:name',
      payload: { id: uid, name }
    })
  }
}

export function changeData(password, newData) {
  return (dispatch) => {
    dispatch({
      type: 'user:data',
      payload: { password, newData }
    })
  }
}
