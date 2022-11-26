import { Router } from 'express'
import passport from 'passport'
import upload from '../middlewares/upload.js'
import { sendMail } from '../config/nodemailer-ethereal.config.js'
import { logger } from '../config/logger.js'

const router = Router()

router.post('/register', [upload.single('avatar'), passport.authenticate('register', { failureRedirect: '/api/sessions/registerfail' })], async (req, res) => {
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  const info = await sendMail(
    'Nuevo registro.',
    '<h2 style="color:teal">Nuevo usuario registrado</h2>'
  )
  logger.info(`Message id: ${info.messageId}`)
  res.status(302).redirect('/login')
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/loginfail' }), async (req, res) => {
  req.session.user = {
    name: req.user.name,
    email: req.user.email,
    id: req.user._id,
    avatar: req.user.avatar,
    phone: req.user.phone,
    cart_id: req.user.cart_id
  }
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  logger.info(`Session user: ${req.session.user}`)
  res.send({ status: 'success', payload: req.user._id })
})

router.get('/loginfail', (req, res) => {
  console.log('login failed')
  res.send({ status: 'error', error: 'Login failed' })
})

router.get('/registerfail', async (req, res) => {
  console.log('Register failed')
  res.status(500).send({ status: 'error', error: 'Register failed' })
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send({ error: err })
    res.send({ message: 'Logout successful' })
  })
})

router.get('/current', (req, res) => {
  res.send(req.session.user)
})

export default router
