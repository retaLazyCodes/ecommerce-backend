import { Router } from 'express'
import passport from 'passport'
import upload from '../middlewares/upload.js'
import { login, signup } from '../controllers/auth.controllers.js'
import { validateSignup } from '../validators/validateSignup.js'
const router = Router()

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication endpoints
 */

/**
 * @swagger
 * paths:
 *  /api/auth/signup:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Create a new user
 *     tags: [Auth]
 *     parameters:
 *       - in: body
 *         name: user_data
 *         description: The data of user to create.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - password
 *             - address
 *             - age
 *             - phone
 *           properties:
 *             name:
 *                type: string
 *                default: Juan
 *             email:
 *               type: string
 *               default: tucorreo@correo.com
 *             password:
 *               type: string
 *               default: 123456
 *             isAdmin:
 *               type: boolean
 *               default: false
 *             address:
 *               type: string
 *               default: Calle falsa 123
 *             age:
 *               type: Number
 *               default: 20
 *             phone:
 *               type: string
 *               default: +54XXXXXXXXXX
 *     responses:
 *       201:
 *         description: Returns the created User with his cart
 *       400:
 *         description: Invalid fields
 *       500:
 *         description: Missing fields or User with given email already exists
 */
router.post(
  '/signup',
  validateSignup,
  upload.single('avatar'),
  passport.authenticate('signup', { session: false }),
  signup
)

/**
 * @swagger
 * paths:
 *  /api/auth/login:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Authenticate a user
 *     tags: [Auth]
 *     parameters:
 *       - in: body
 *         name: user_data
 *         description: The data of user to authenticate.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               default: tucorreo@correo.com
 *             password:
 *               type: string
 *               default: 123456
 *     responses:
 *       200:
 *         description: Returns the token of the authenticated user
 *       400:
 *         description: The email or password is not valid
 */
router.post('/login', login)

export default router
