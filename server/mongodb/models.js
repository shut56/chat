import mongoose from 'mongoose'

import userSchema from './schemas'

export default mongoose.model('users', userSchema)
