import userModel from '../mongodb/models/userModel'

const arrayToObject = (arr) => {
  // console.log('Array from DB: ', arr)
  return arr.reduce((acc, user) => {
    return { ...acc, [user._id]: { id: user._id, name: user.name, role: user.role } }
  }, {})
}

const errorHandler = (type, err) => {
  if (typeof err.code !== 'undefined') {
    switch (err.code.toString()) {
      case '11000': {
        return `Error: This ${type} is already in taken`
      }
      default: {
        return 'Something wrong'
      }
    }
  }
  // console.log(err)
  return `${err}`
}

module.exports = (io, socket, connectedUsers) => {
  const getUsers = async () => {
    // console.log('User Handler')
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
    // console.log('New user: ', body)
    try {
      await userModel.create(body)
      const userList = await userModel.find({})

      socket.emit('SOCKET_IO', {
        type: 'server:response',
        payload: {
          status: 'ok',
          text: 'Registration is complete!\nYou can now log into your account.'
        }
      })

      socket.emit('SOCKET_IO', {
        type: 'register:complete'
      })

      socket.broadcast.emit('SOCKET_IO', {
        type: 'users:list',
        payload: arrayToObject(userList)
      })
    } catch (err) {
      // console.log(`User ${socket.id} - ${err}`)
      const errorText = errorHandler('email', err)
      socket.emit('SOCKET_IO', {
        type: 'server:response',
        payload: {
          status: 'error',
          text: errorText
        }
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
          'upsert': false
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

  const changeUserData = async ({ password, newData }) => {
    const uid = connectedUsers.getUser(socket.id)
    try {
      const newEmail = await userModel.findAndChangeUserData({ uid, password, newData })

      // console.log('User data changed')

      socket.emit('SOCKET_IO', {
        type: 'server:response',
        payload: {
          status: 'ok',
          text: 'Saved!',
          data: {
            email: newEmail
          }
        }
      })
    } catch (err) {
      // console.log(`User ${socket.id} - ${err}`)
      const errorText = errorHandler(newData.type, err)
      socket.emit('SOCKET_IO', {
        type: 'server:response',
        payload: {
          status: 'error',
          text: errorText
        }
      })
    }
  }

  socket.on('users:get', getUsers)
  socket.on('user:register', (payload) => setUser(payload))
  socket.on('user:name', (payload) => changeUserName(payload))
  socket.on('user:data', (payload) => changeUserData(payload))
}
