import passport from 'passport'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { logger } from '../config/logger.js'
import { User } from '../models/user.model.js'
import cartModel from '../models/cart.model.js'
import { sendMail } from '../config/nodemailer.config.js'
const Cart = mongoose.model(cartModel.collection, cartModel.schema)

export const signup = async (req, res, next) => {
  const userId = req.user._id
  const email = req.user.email
  const name = req.user.name

  try {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    const newCart = new Cart({
      userId
    })
    const cart = await newCart.save()
    const userOK = await User.findOne({ email })

    await sendMail(
      userOK.email,
      'Nuevo registro',
      'registro',
      name
    )

    res.status(201).json({
      message: 'Signup successful',
      createdCart: cart,
      createdUser: userOK
    })
  } catch (error) {
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    next(error)
  }
}

export const login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      if (err) {
        const error = new Error('An error occurred.')
        return next(error)
      }
      if (!user && info) {
        return res.status(400).json({ message: info.message })
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { _id: user._id, email: user.email, name: user.name, phone: user.phone }
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY)

        return res.status(200).json({ message: token })
      })
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  })(req, res, next)
}

export const authMe = async (req, res, next) => {
  try {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    res.status(201).json({
      user: req.user
    })
  } catch (error) {
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    next(error)
  }
}
