import mongoose from 'mongoose'

const messageStoreSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true
  },
  history: {
    type: [{
      uid: String,
      text: String,
      time: String
    }]
  }
}, {
  timestamps: true
})

export default mongoose.model('messages', messageStoreSchema)
