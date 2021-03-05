module.exports = (socketIO, socket, msgHist, channels) => {
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
      case 'GET_MESSAGE_HISTORY_FROM_CHANNEL': {
        socketIO.to(socket.id).emit('SOCKET_IO', {
          type: 'GET_MESSAGE_HISTORY_FROM_CHANNEL',
          payload: msgHist[action.payload]
        })
        break
      }
      default: {
        console.log('Client Message Received')
      }
    }
  })
}
