import messageStoreModel from '../mongodb/models/messageStoreModel'

module.exports = (io, socket) => {
  const addMessage = async (payload) => {
    try {
      const messageHistory = await messageStoreModel.findOne({ channelId: payload.id })
      const time = new Date()
      const updatedHistory = [...messageHistory.history, { ...payload.message, time: time.toUTCString() }]

      await messageStoreModel.updateOne(
        { channelId: `${payload.id}` },
        { $set: { history: updatedHistory } },
        {
          'multi': false,
          'upsert': false
        }
      )

      socket.emit('SOCKET_IO', {
        type: 'message:history',
        payload: updatedHistory
      })
      console.log('History sent by', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  socket.on('message:add', (messageObj) => addMessage(messageObj))
}
