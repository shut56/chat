import { SAVE_NAME } from './auth'

export const ALERT = 'ALERT'
const MY_ACCOUNT = 'MY_ACCOUNT'

const initialState = {
  menuItems: {
    myAccount: {
      name: 'My Account',
      userName: '',
      email: '',
      password: ''
    },
    notifications: {
      name: 'Notifications',
      popUp: false
    }
  },
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
    case ALERT: {
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

export function clearResponse() {
  return ({
    type: ALERT,
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
