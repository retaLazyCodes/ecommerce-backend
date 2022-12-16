import { Router } from 'express'
import passport from 'passport'
import ProductController from '../controllers/products.controllers.js'
import { isAdminFunc } from '../middlewares/auth.js'
const passportOK = passport.authenticate('jwt', { session: false })

const router = Router()

// [GET] 🌐/api/products/:id?
router.get('/:id?', ProductController.getProducts)

// [POST] 🌐/api/products/
router.post('/', passportOK, isAdminFunc, ProductController.createProduct)

// [PUT] 🌐/api/products/:id
router.put('/:id', passportOK, isAdminFunc, ProductController.updateProduct)

// [DELETE] 🌐/api/products/:id
router.delete('/:id', passportOK, isAdminFunc, ProductController.deleteProduct)

export default router
