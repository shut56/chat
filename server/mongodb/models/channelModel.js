import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  userList: {
    type: [String]
  },
  access: {
    type: String,
    enum: ['Neither', 'All', 'Some users'],
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('channels', channelSchema)
