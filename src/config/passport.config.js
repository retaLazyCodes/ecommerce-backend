import passport from 'passport'
import path from 'path'
import local from 'passport-local'
import { User } from '../models/User.js'
import { Cart } from '../models/Cart.js'
import { createHash, isValidPassword } from '../utils.js'
import cartController from '../controllers/cart.controllers.js'
const LocalStrategy = local.Strategy // local = username + password

const { service } = cartController

const initializePassport = () => {
  passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
    try {
      const { file } = req
      const { name, address, age, phone } = req.body
      if (!name || !email || !password) return done(null, false)
      const exists = await User.findOne({ email })
      if (exists) return done(null, false)
      const userCart = await service.create(new Cart({ timestamp: new Date() }))
      const result = await User.create({
        name,
        email,
        password: createHash(password),
        address,
        age,
        phone,
        avatar: path.join('/uploads/', file.filename),
        cart_id: userCart._id
      })
      // SI TODO SALIÓ BIEN
      return done(null, result)
    } catch (error) {
      return done(error)
    }
  }))

  passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      if (!email || !password) return done(null, false)
      const user = await User.findOne({ email })
      if (!user) return done(null, false)
      if (!isValidPassword(user, password)) return done(null, false)
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    const result = await User.findOne({ _id: id })
    return done(null, result)
  })
}

export default initializePassport
