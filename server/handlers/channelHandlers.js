import channelModel from '../mongodb/models/channelModel'
import messageStoreModel from '../mongodb/models/messageStoreModel'

const arrayToObject = (arr) => {
  // console.log('Array from DB: ', arr)
  return arr.reduce((acc, chan) => {
    return { ...acc, [chan._id]: chan }
  }, {})
}

module.exports = (io, socket) => {
  const getChannels = async ({ uid }) => {
    console.log('Channels for ', uid)
    try {
      const channelList = await channelModel.find({})

      io.to(socket.id).emit('SOCKET_IO', {
        type: 'channel:list',
        payload: { channels: arrayToObject(channelList) }
      })

      console.log('Сhannel list & sent', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  const addChannel = async ({ channel, uid, privateChannel }) => {
    console.log('Add Channel: ', { channel, uid, privateChannel })
    try {
      let access = 'All'

      if (privateChannel) {
        access = 'Neither'
      }

      const newChannel = await channelModel.create({ ...channel, access })
      const channelList = await channelModel.find({})

      const channelId = newChannel._id

      const messageHistory = await messageStoreModel.create({ channelId })

      socket.join(channelId)

      io.to(socket.id).emit('SOCKET_IO', {
        type: 'channel:list',
        payload: { channels: arrayToObject(channelList), id: channelId }
      })
      io.to(socket.id).emit('SOCKET_IO', {
        type: 'message:history',
        payload: { channelId, history: messageHistory.history }
      })
      socket.broadcast.emit('SOCKET_IO', {
        type: 'channel:list',
        payload: { channels: arrayToObject(channelList) }
      })

      console.log('Сhannel list sent', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  const removeChannel = async ({ id: channel, uid }) => {
    console.log('REMOVE: ', { id: channel, uid })
    try {
      await channelModel.deleteOne({ _id: channel })
      const channelList = await channelModel.find({})

      await messageStoreModel.deleteOne({ channelId: channel })

      io.emit('SOCKET_IO', {
        type: 'channel:list',
        payload: { channels: arrayToObject(channelList) }
      })
      io.to(channel).emit('SOCKET_IO', {
        type: 'channel:list',
        payload: { channels: arrayToObject(channelList), trigger: channel }
      })

      console.log('Сhannel removed', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  const editChannel = async ({ channel, uid }) => {
    console.log('Edit Channel: ', { channel, uid })
    try {
      await channelModel.updateOne(
        { _id: channel.id },
        {
          $set: { ...channel }
        },
        {
          'multi': false,
          'upsert': false,
          'new': true
        }
      )
      const channelList = await channelModel.find({})

      io.emit('SOCKET_IO', {
        type: 'channel:list',
        payload: { channels: arrayToObject(channelList) }
      })

      console.log(`Сhannel ${channel} edited`, socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  socket.on('channels:get', (payload) => getChannels(payload))
  socket.on('channel:add', (payload) => addChannel(payload))
  socket.on('channel:remove', (payload) => removeChannel(payload))
  socket.on('channel:edit', (payload) => editChannel(payload))
}
