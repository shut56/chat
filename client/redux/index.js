import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import { io } from 'socket.io-client'

import rootReducer from './reducers'
import socket from './middleware/socketIO'

export const history = createBrowserHistory()

const preloadedState = {}

const middleware = [routerMiddleware(history), socket, thunk]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnhancers = composeFunc(applyMiddleware(...middleware))

const store = createStore(rootReducer(history), preloadedState, composedEnhancers)

// let socket

// if (SOCKETS_ENABLE || false) {
//   // eslint-disable-next-line
//   socket = io(`${window.location.origin}`, {
//     path: '/ws'
//   })

//   socket.emit('newMessage', store.getState().messages.messageHistory)
//   socket.on('newMessage', (arg) => {
//     store.dispatch({
//       type: 'SEND_MESSAGE',
//       action: {
//         msgHistory: arg
//       }
//     })
//   })
// }

// export function getSocket() {
//   return socket
// }

export default store
