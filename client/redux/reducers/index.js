import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from './auth'
import channels from './channels'
import messages from './messages'
import secondary from './secondary'
import settings from './settings'
import users from './users'
import userSettings from './userSettings'

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    auth,
    channels,
    messages,
    secondary,
    settings,
    users,
    userSettings
  })
}

export default createRootReducer
