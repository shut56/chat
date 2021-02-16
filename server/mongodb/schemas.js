import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  rose: {
    type: [String],
    default: ['user']
  }
}, {
  timestamps: true
})

export default userSchema
