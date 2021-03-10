import axios from 'axios'
import Cookies from 'universal-cookie'
import { history } from '..'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const UPDATE_NAME = 'UPDATE_NAME'
const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'
export const SERVER_RESPONSE = 'SERVER_RESPONSE'

const cookie = new Cookies()

const initialState = {
  email: '',
  password: '',
  name: '',
  token: cookie.get('token'),
  user: {
    _id: cookie.get('id')
  },
  register: false,
  response: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN: {
      return {
        ...state,
        email: action.email
      }
    }
    case UPDATE_PASSWORD: {
      return {
        ...state,
        password: action.pass
      }
    }
    case UPDATE_NAME: {
      return {
        ...state,
        name: action.name
      }
    }
    case LOGIN: {
      return {
        ...state,
        token: action.token,
        user: action.user,
        password: ''
      }
    }
    case REGISTER: {
      return {
        ...state,
        register: action.toggle,
        name: ''
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

export function updateLogin(email) {
  return ({
    type: UPDATE_LOGIN,
    email
  })
}

export function updatePassword(pass) {
  return ({
    type: UPDATE_PASSWORD,
    pass
  })
}

export function updateName(name) {
  return ({
    type: UPDATE_NAME,
    name
  })
}

export function signUp() {
  return (dispatch, getState) => {
    const { email, password, name } = getState().auth
    // axios({
    //   url: '/api/v1/register',
    //   method: 'post',
    //   data: {
    //     email,
    //     password,
    //     name
    //   }
    // })
    //   .then(({ data }) => {
    //     if (data.status === 'ok') {
    //       history.push('/login')
    //       dispatch({
    //         type: REGISTER,
    //         toggle: false
    //       })
    //       dispatch({
    //         type: SERVER_RESPONSE,
    //         payload: 'Registration is complete!\nYou can now log into your account.'
    //       })
    //     } else {
    //       dispatch({
    //         type: SERVER_RESPONSE,
    //         payload: 'This email has already been registered.'
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     throw new Error('Server unavailable', `${err}`)
    //   })

    dispatch({
      type: 'socket:open'
    })
    dispatch({
      type: 'user:register',
      payload: {
        email,
        password,
        name
      }
    })
  }
}

export function signIn() {
  return (dispatch, getState) => {
    const { email, password } = getState().auth
    axios({
      url: '/api/v1/auth',
      method: 'post',
      data: {
        email,
        password
      }
    })
      .then(({ data }) => {
        dispatch({
          type: LOGIN,
          token: data.token,
          user: data.user
        })
        dispatch({
          type: 'socket:open'
        })
        history.push('/channels')
      })
  }
}

export function signOut() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  history.push('/')
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      token: '',
      user: {}
    })
    dispatch({
      type: 'socket:close'
    })
  }
}

export function trySignIn() {
  return (dispatch) => {
    axios('/api/v1/verify')
      .then(({ data }) => {
        dispatch({
          type: LOGIN,
          token: data.token,
          user: data.user
        })
        dispatch({
          type: 'socket:open'
        })
      })
  }
}

export function tryGetUserInfo() {
  return () => {
    axios('/api/v1/user-info')
      .then(({ data }) => {
        console.log(data)
      })
  }
}

export function doRegister(toggle) {
  return ({
    type: REGISTER,
    toggle
  })
}

export function clearResponse() {
  return ({
    type: SERVER_RESPONSE,
    payload: ''
  })
}
