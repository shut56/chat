import axios from 'axios'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'

const initialState = {
  login: '',
  password: '',
  token: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN: {
      return {
        ...state,
        login: action.name
      }
    }
    case UPDATE_PASSWORD: {
      return {
        ...state,
        password: action.pass
      }
    }
    case LOGIN: {
      return {
        ...state,
        token: action.token
      }
    }
    default: {
      return state
    }
  }
}

export function updateLogin(name) {
  return ({
    type: UPDATE_LOGIN,
    name
  })
}

export function updatePassword(pass) {
  return ({
    type: UPDATE_PASSWORD,
    pass
  })
}

export function signIn() {
  return (dispatch, getState) => {
    const { login, password } = getState().auth
    axios({
      url: '/api/v1/auth',
      method: 'post',
      data: {
        login,
        password
      }
    })
      .then(({ data }) => {
        dispatch({
          type: LOGIN,
          token: data.token
        })
      })
  }
}
