import mongoose from 'mongoose'

const directSchema = new mongoose.Schema({
  userList: {
    type: [String]
  }
}, {
  timestamps: true
})

export default mongoose.model('direct', directSchema)
