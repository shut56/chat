import userModel from '../mongodb/models/userModel'

module.exports = (io, socket) => {
  const getUsers = async () => {
    console.log('User Handler')
    try {
      const userList = await userModel.find({})
      console.log('userList: ', userList.map((user) => user._id))
      io.to(socket.id).emit('SOCKET_IO', {
        type: 'users:list',
        payload: userList.map((user) => user._id)
      })  
    } catch (err) {
      console.log(`${err}`)
    }
  }

  socket.on('users:get', getUsers)
}
