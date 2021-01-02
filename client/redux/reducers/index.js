import { combineReducers } from 'redux'

import messages from './messages'

const createRootReducer = () => {
  return combineReducers({
    messages
  })
}

export default createRootReducer
