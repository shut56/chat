import channelModel from '../mongodb/models/channelModel'
import messageStoreModel from '../mongodb/models/messageStoreModel'
import channels from '../../client/redux/reducers/channels'

const arrayToObject = (arr) => {
  console.log('Array from DB: ', arr)
  return arr.reduce((acc, chan) => {
    return { ...acc, [chan._id]: chan }
  }, {})
}

module.exports = (io, socket) => {
  const getChannels = async () => {
    try {
      const channelList = await channelModel.find({})
      console.log('channelList: ', arrayToObject(channelList))
      io.to(socket.id).emit('SOCKET_IO', {
        type: 'channel:list',
        payload: arrayToObject(channelList)
      })
      console.log('Сhannel list & history sent', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  const addChannel = async (channel) => {
    console.log('Add Channel: ', channel)
    try {
      await channelModel.create(channel)
      const channelList = await channelModel.find({})
      console.log('channelList: ', arrayToObject(channelList))

      const channelId = channelList[channelList.length - 1]._id

      await messageStoreModel.create({ channelId })

      socket.broadcast.emit('SOCKET_IO', {
        type: 'channel:list',
        payload: arrayToObject(channelList)
      })
      io.to(socket.id).emit('SOCKET_IO', {
        type: 'channel:list',
        payload: { channels: arrayToObject(channelList), id: channelId }
      })
      console.log('Сhannel list sent', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  const removeChannel = async (channel) => {
    console.log(channel)
    try {
      await channelModel.deleteOne({ _id: channel })
      const channelList = await channelModel.find({})

      socket.emit('SOCKET_IO', {
        type: 'channel:list',
        payload: arrayToObject(channelList)
      })
      console.log('Сhannel list sent', socket.id)
    } catch (err) {
      console.log(`${err}`)
    }
  }

  socket.on('channels:get', getChannels)
  socket.on('channel:add', (channelObj) => addChannel(channelObj))
  socket.on('channel:remove', (payload) => removeChannel(payload.id))
}
