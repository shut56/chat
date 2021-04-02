export const GET_USERS = 'GET_USERS'
const GET_USER_STATUS = 'GET_USER_STATUS'

const initialState = {
  userList: {},
  userStatus: {}
}

// const user = {
//   id: 1,
//   name: 'Just a Frog',
//   hashTag: 'pepe#1',
//   img: 'http://',
//   _registrationDate: 0,
//   _isDeleted: false,
//   _deletedAt: 0,
//   _isBlocked: false,
//   _blockedAt: 0,
//   roles: ['user'],
//   channels: ['direct']
// }

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        userList: action.users
      }
    }
    case GET_USER_STATUS: {
      return {
        ...state,
        userStatus: action.users
      }
    }
    default: {
      return state
    }
  }
}

export function getSocketId() {
  return (dispatch, getState) => {
    dispatch({
      type: 'users:get',
      payload: { id: getState().auth.user._id }
    })
    dispatch({
      type: 'user:online',
      payload: { id: getState().auth.user._id }
    })
  }
}
