import mongoose from 'mongoose'

import config from '../config'

mongoose.connection.on('connected', () => {
  console.log('DB is connected')
})

mongoose.connection.on('error', (err) => {
  console.log('DB isn\'t connected')
  console.log(err)
  process.exit(1)
})

exports.connect = (mongoUrl = config.mongoUrl) => {
  mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  return mongoose.connection
}
