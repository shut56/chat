import axios from 'axios'
import Cookies from 'universal-cookie'
import { history } from '..'

const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const LOGIN = 'LOGIN'

const cookie = new Cookies()

const initialState = {
  email: '',
  password: '',
  token: cookie.get('token'),
  user: {}
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
    case LOGIN: {
      return {
        ...state,
        token: action.token,
        user: action.user,
        password: ''
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
        history.push('/channels')
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
