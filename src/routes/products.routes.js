import { Router } from 'express'
import productsController from '../controllers/products.controllers.js'
import { authorizeUserRole } from '../middlewares/authorizeUserRole.js'
import { config } from '../config/index.js'

const USER_ROLE = config.USER_ADMIN

const router = Router()

router.get('/:id?', productsController.getProducts)
router.post('/', authorizeUserRole(USER_ROLE), productsController.createProduct)
router.put('/:id', authorizeUserRole(USER_ROLE), productsController.updateProduct)
router.delete('/:id', authorizeUserRole(USER_ROLE), productsController.deleteProduct)

export default router
