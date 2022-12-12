import { Router } from 'express'
import ProductController from '../controllers/products.controllers.js'
import { authorizeUserRole } from '../middlewares/authorizeUserRole.js'
import { config } from '../config/index.js'

const USER_ROLE = config.USER_ADMIN

const router = Router()

// [GET] 🌐/api/products/:id?
router.get('/:id?', ProductController.getProducts)

// [POST] 🌐/api/products/
router.post('/', authorizeUserRole(USER_ROLE), ProductController.createProduct)

// [PUT] 🌐/api/products/:id
router.put('/:id', authorizeUserRole(USER_ROLE), ProductController.updateProduct)

// [DELETE] 🌐/api/products/:id
router.delete('/:id', authorizeUserRole(USER_ROLE), ProductController.deleteProduct)

export default router
