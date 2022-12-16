import passport from 'passport'
import localStrategy from 'passport-local'
import { Strategy, ExtractJwt } from 'passport-jwt'
import path from 'path'
import { User } from '../models/user.model.js'
import cartController from '../controllers/cart.controllers.js'
const LocalStrategyPL = localStrategy.Strategy

const strategyOptionsSignUp = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}

const strategyOptions = {
  usernameField: 'email',
  passwordField: 'password'
}
const strategyJWT = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const signup = async (req, email, password, done) => {
  try {
    const { file } = req
    const { name, phone, isAdmin, address, age } = req.body
    const userCart = await cartController.service.create({ timestamp: new Date(), products: [] })
    const user = await new User({
      name,
      email,
      password,
      isAdmin,
      address,
      age,
      phone,
      avatar: file ? path.join('/uploads/', file.filename) : process.env.DEFAULT_AVATAR,
      cart_id: userCart._id
    })
    await user.save()
    const userOK = await User.findOne({ email })
    return done(null, userOK)
  } catch (error) {
    done(error)
  }
}

const login = async (email, password, done) => {
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return done(null, false, { message: 'User not found' })
    }

    const validate = await user.isValidPassword(password)

    if (!validate) {
      return done(null, false, { message: 'Wrong Password' })
    }

    return done(null, user, { message: 'Logged in Successfully' })
  } catch (error) {
    console.log('Erro no login', error)
    return done(error)
  }
}

// Passport middleware to handle user registration

passport.use('signup', new LocalStrategyPL(strategyOptionsSignUp, signup))

// Passport middleware to handle user login

passport.use('login', new LocalStrategyPL(strategyOptions, login))

passport.use(
  new Strategy(strategyJWT, async (token, done) => {
    try {
      console.log('token.user--------', token.user)
      return done(null, token.user)
    } catch (error) {
      done(error)
    }
  })
)

export const isAdminFunc = async (req, res, next) => {
  const userId = req.user._id
  try {
    const userFound = await User.findOne({ _id: userId })
    const isAdmin = userFound.isAdmin
    if (isAdmin) {
      next()
    } else {
      return res
        .status(401)
        .send({ message: 'Solo permitido a administradores' })
    }
  } catch (error) {
    return res
      .status(401)
      .send({ message: 'Solo permitido a administradores' })
  }
}

export default passport
