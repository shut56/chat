import messageStoreModel from '../mongodb/models/messageStoreModel'

module.exports = (io, socket) => {
  const getMessages = async (payload) => {
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
      const messageHistoryDB = await messageStoreModel.findOne({ channelId: payload.id })
      const time = new Date()
      const updatedHistory = [...messageHistoryDB.history, { ...payload.message, time: time.toUTCString() }]

      await messageStoreModel.updateOne(
        { channelId: `${payload.id}` },
        { $set: { history: updatedHistory } },
        {
          'multi': false,
          'upsert': false
        }
      )

      io.emit('SOCKET_IO', {
        type: 'message:history',
        payload: { channelId: payload.id, history: updatedHistory }
      })
      console.log('History sent by', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  socket.on('messages:get', (messageObj) => getMessages(messageObj))
  socket.on('message:add', (channelId) => addMessage(channelId))
}
