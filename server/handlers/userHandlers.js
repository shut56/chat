import userModel from '../mongodb/models/userModel'

const arrayToObject = (arr) => {
  // console.log('Array from DB: ', arr)
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

  const setUser = async (body) => {
    console.log('New user: ', body)
    try {
      await userModel.create(body)
      const userList = await userModel.find({})

      socket.emit('SOCKET_IO', {
        type: 'server:response',
        payload: 'Registration is complete!\nYou can now log into your account.'
      })

      socket.emit('SOCKET_IO', {
        type: 'register:complete'
      })

      socket.broadcast.emit('SOCKET_IO', {
        type: 'users:list',
        payload: arrayToObject(userList)
      })
    } catch (err) {
      console.log(`${err}`)
      socket.emit('SOCKET_IO', {
        type: 'server:response',
        payload: 'This email has already been registered.'
      })
    }
  }

  const changeUserName = async ({ id, name }) => {
    try {
      await userModel.updateOne(
        { _id: id },
        {
          $set: { name }
        },
        {
          'multi': false,
          'upsert': false,
          'new': true
        }
      )
      const userList = await userModel.find({})

      io.emit('SOCKET_IO', {
        type: 'users:list',
        payload: arrayToObject(userList)
      })
    } catch (err) {
      console.log(`${err}`)
    }
  }

  socket.on('users:get', getUsers)
  socket.on('user:register', (payload) => setUser(payload))
  socket.on('user:name', (payload) => changeUserName(payload))
}
