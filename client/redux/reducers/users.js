export const GET_USERS = 'GET_USERS'

const initialState = {
  userList: [{}]
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
    default: {
      return state
    }
  }
}
