import messageStoreModel from '../mongodb/models/messageStoreModel'

module.exports = (io, socket) => {
  const getMessages = async (payload) => {
    socket.join(payload.id)
    try {
      const messageHistory = await messageStoreModel.findOne({ channelId: payload.id })

      socket.emit('SOCKET_IO', {
        type: 'message:history',
        payload: { channelId: payload.id, history: messageHistory.history }
      })
      console.log('History for channel sent', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  const addMessage = async (payload) => {
    try {
      const time = new Date()
      const newMessage = { ...payload.message, time: time.toUTCString() }

      const updatedHistory = await messageStoreModel.findOneAndUpdate(
        { channelId: `${payload.id}` },
        {
          $addToSet: { history: newMessage }
        },
        {
          'multi': false,
          'upsert': false,
          'new': true
        }
      )

      io.emit('SOCKET_IO', {
        type: 'message:history',
        payload: { channelId: payload.id, history: updatedHistory.history }
      })
      console.log('History sent by', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  const removeMessage = async (payload) => {
    try {
      const updatedHistory = await messageStoreModel.findOneAndUpdate(
        { channelId: payload.channelId },
        {
          $pull: { history: { _id: payload.messageId } }
        },
        {
          'multi': false,
          'upsert': false,
          'new': true
        }
      )

      io.emit('SOCKET_IO', {
        type: 'message:history',
        payload: { channelId: payload.channelId, history: updatedHistory.history }
      })
      console.log('History sent by', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  socket.on('messages:get', (messageObj) => getMessages(messageObj))
  socket.on('message:add', (channelId) => addMessage(channelId))
  socket.on('message:remove', (payload) => removeMessage(payload))
}
