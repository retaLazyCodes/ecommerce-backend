import passport from 'passport'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const signup = async (req, res, next) => {
  const email = req.user.email

  try {
    const userOK = await User.findOne({ email })

    res.status(201).json({
      message: 'Signup successful',
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
      // Problema aqui para Swagger identificar user
      if (!user && info) {
        return res.status(401).json({ message: info.message })
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY)

        return res.status(200).json({ message: token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}
