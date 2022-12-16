import { Router } from 'express'
import passport from 'passport'
import upload from '../middlewares/upload.js'
import { login, signup } from '../controllers/auth.controllers.js'
import { validateSignup } from '../validators/validateSignup.js'
const router = Router()

router.post(
  '/signup',
  validateSignup,
  upload.single('avatar'),
  passport.authenticate('signup', { session: false }),
  signup
)

router.post('/login', login)

export default router
