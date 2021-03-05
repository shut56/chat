import userModel from '../mongodb/models/userModel'

const arrayToObject = (arr) => {
  console.log('Array from DB: ', arr)
  return arr.reduce((acc, user) => {
    return { ...acc, [user._id]: { id: user._id, name: user.name } }
  }, {})
}

module.exports = (io, socket) => {
  const getUsers = async () => {
    console.log('User Handler')
    try {
      const userList = await userModel.find({})

      socket.emit('SOCKET_IO', {
        type: 'users:list',
        payload: arrayToObject(userList)
      })
    } catch (err) {
      console.log(`${err}`)
    }
  }

  socket.on('users:get', getUsers)
}
