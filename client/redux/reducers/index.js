import { combineReducers } from 'redux'

import auth from './auth'
import channels from './channels'
import messages from './messages'
import secondary from './secondary'
import settings from './settings'

const createRootReducer = () => {
  return combineReducers({
    auth,
    channels,
    messages,
    secondary,
    settings
  })
}

export default createRootReducer
