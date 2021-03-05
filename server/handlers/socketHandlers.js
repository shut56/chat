let tag = 1
const users = []

module.exports = (socketIO, socket, msgHist) => {
  socket.on('SOCKET_SEND', (action) => {
    console.log('action', action)

    switch (action.type) {
      case 'SET_NAME': {
        const nameWithTag = `${action.payload.name}#${tag}`
        tag += 1
        users.push(nameWithTag)
        socketIO.to(socket.id).emit('SOCKET_IO', {
          type: 'SET_NAME',
          payload: nameWithTag
        })
        break
      }
      default: {
        console.log('Client Message Received')
      }
    }
  })
}
