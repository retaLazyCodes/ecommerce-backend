import passport from 'passport'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { User } from '../models/user.model.js'
import cartModel from '../models/cart.model.js'
import { sendMail } from '../config/nodemailer.config.js'
const Cart = mongoose.model(cartModel.collection, cartModel.schema)

export const signup = async (req, res, next) => {
  const userId = req.user._id
  const email = req.user.email
  const name = req.user.name

  try {
    const newCart = new Cart({
      userId
    })
    const cart = await newCart.save()
    const userOK = await User.findOne({ email })

    const info = await sendMail(
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
    return next(error)
  }
}

export const login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        const error = new Error('An error occurred.')
        return next(error)
      }
      if (!user && info) {
        return res.status(401).json({ message: info.message })
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { _id: user._id, email: user.email, name: user.name, phone: user.phone }
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY)

        return res.status(200).json({ message: token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}
