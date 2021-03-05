import jwt from 'jsonwebtoken'

import config from '../config'
import userModel from './models/userModel'
import auth from '../middleware/auth'

module.exports = (server) => {
  server.post('/api/v1/register', async (req, res) => {
    console.log('New user: ', req.body)
    try {
      await userModel.create(req.body)
      res.json({ status: 'ok' })
    } catch (err) {
      res.json({ status: 'error', error: `${err}` })
    }
  })

  server.post('/api/v1/auth', async (req, res) => {
    console.log(req.body)
    try {
      const user = await userModel.findAndValidateUser(req.body)
      const payload = { uid: user.id }
      const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
      user.password = undefined
      console.log(`${user.email} logged`)
      res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
      res.json({ status: 'ok', token, user })
    } catch (err) {
      res.json({ status: 'error', error: `${err}` })
    }
  })

  server.get('/api/v1/verify', async (req, res) => {
    try {
      const jwtUser = jwt.verify(req.cookies.token, config.secret)
      const user = await userModel.findById(jwtUser.uid)
      const payload = { uid: user.id }
      const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
      user.password = undefined
      res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
      res.json({ status: 'ok', token, user })
    } catch (err) {
      res.json({ status: 'error', error: `${err}` })
    }
  })

  server.get('/api/v1/user-info', auth(['admin']), (req, res) => {
    res.json({ status: 'user-info' })
  })
}