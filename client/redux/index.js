import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { io } from 'socket.io-client'

import rootReducer from './reducers'

const preloadedState = {
  messages: {
    messageHistory: [
      {
        name: 'Test user',
        text: 'Test message'
      }
    ]
  }
}

const middleware = [thunk]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnhancers = composeFunc(applyMiddleware(...middleware))

const store = createStore(rootReducer(), preloadedState, composedEnhancers)

if (SOCKETS_ENABLE || false) {
  // eslint-disable-next-line
  const socket = io(`${window.location.origin}`, {
    path: '/ws'
  })
  console.log(store.getState())
  socket.emit('newMessage', store.getState().messages.messageHistory)
  socket.on('newMessage', (arg) => {
    console.log(arg)
  })
}

export default store
