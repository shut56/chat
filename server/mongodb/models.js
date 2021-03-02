import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    default: ['user']
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password, 10)

  return next()
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw new Error('No E-mail')
    }

    if (!password) {
      throw new Error('No Password')
    }

    const user = await this.findOne({ email }).exec()

    if (!user) {
      throw new Error('No User')
    }

    const isPassword = await user.passwordMatches(password)

    if (!isPassword) {
      throw new Error('Password incorrect')
    }

    return user
  }
}

export default mongoose.model('users', userSchema)
