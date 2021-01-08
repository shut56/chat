import { combineReducers } from 'redux'

import channels from './channels'
import messages from './messages'
import secondary from './secondary'
import settings from './settings'

const createRootReducer = () => {
  return combineReducers({
    channels,
    messages,
    secondary,
    settings
  })
}

export default createRootReducer
