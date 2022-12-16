import { Router } from 'express'
import passport from 'passport'
import ProductController from '../controllers/products.controllers.js'
import { isAdminFunc } from '../middlewares/auth.js'
const passportOK = passport.authenticate('jwt', { session: false })

const router = Router()

router.get('/:id?', ProductController.getProducts)

router.post('/', passportOK, isAdminFunc, ProductController.createProduct)

router.put('/:id', passportOK, isAdminFunc, ProductController.updateProduct)

router.delete('/:id', passportOK, isAdminFunc, ProductController.deleteProduct)

export default router
