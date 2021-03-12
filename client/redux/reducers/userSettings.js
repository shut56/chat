import { SAVE_NAME } from './auth'

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
  activeItem: 'myAccount'
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
