import { Router } from 'express'
import productsController from '../controllers/products.controllers.js'
import cartController from '../controllers/cart.controllers.js'
import { sendMail } from '../config/nodemailer-ethereal.config.js'
import { sendSMS } from '../config/twilio-sms.config.js'
import { logger } from '../config/logger.js'
const { service } = productsController

const router = Router()

router.get('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/login')
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  const products = await service.get()
  const cartProducts = await cartController.service.getProducts(req.session.user.cart_id)
  res.render('home.hbs', {
    username: req.session.user.name,
    email: req.session.user.email,
    avatar: req.session.user.avatar,
    cart_id: req.session.user.cart_id,
    products,
    cartProducts: cartProducts?.products,
    cartProductsPrice: cartProducts?.products.reduce((partialSum, p) => partialSum + p.price, 0),
    layout: 'index'
  })
})

router.get('/checkout', async (req, res) => {
  if (!req.session.user) return res.redirect('/login')
  const cartProducts = await cartController.service.getProducts(req.session.user.cart_id)
  const cartProductsPrice = cartProducts?.products.reduce((partialSum, p) => partialSum + p.price, 0)
  const orden = cartProducts.products.map(p => '- ' + p.name + ' : $' + p.price).join('\n')
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  await sendMail(
    `Nuevo pedido de ${req.session.user.name} ${req.session.user.email}`,
    `<h2 style="color:teal">Tu orden fue aceptada!</h2><p> <h3>Orden:</h3><br/>${orden}</p><br><h3>Total: $${cartProductsPrice}</h3>`
  )
  await sendSMS(
    `Nuevo pedido a nombre de ${req.session.user.name} ${req.session.user.email} fue recibido. Su estado actual es EN PROCESO.\nOrden:\n${orden}\nTotal: $${cartProductsPrice}`,
    req.session.user.phone
  )
  res.redirect('/')
})

router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/')
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  res.render('login.hbs', { layout: 'index' })
})

router.get('/logout', (req, res) => {
  if (!req.session.user) return res.redirect('/')
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  res.render('logout.hbs', { username: req.session.user.name, layout: 'index' })
})

router.get('/register', (req, res) => {
  if (req.session.user) return res.redirect('/')
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  res.render('register.hbs', { layout: 'index' })
})

router.get('/registerfail', async (req, res) => {
  if (req.session.user) return res.redirect('/')
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  res.render('registerfail.hbs', { layout: 'index' })
})

router.get('/loginfail', async (req, res) => {
  if (req.session.user) return res.redirect('/')
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  res.render('loginfail.hbs', { layout: 'index' })
})

export default router
