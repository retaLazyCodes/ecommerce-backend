import { Router } from 'express'
import CartController from '../controllers/cart.controllers.js'

const router = Router()

// [POST] 🌐/api/cart/
router.post('/', CartController.createCart)

// [DELETE] 🌐/api/cart/:id
router.delete('/:id', CartController.deleteCart)

// [GET] 🌐/api/cart/:id/products/
router.get('/:id/products', CartController.getProductsByCartId)

// [POST] 🌐/api/cart/:id/products/:id_prod'
router.post('/:id/products/:id_prod', CartController.addProductToCart)

// [DELETE] 🌐/api/cart/:id/products/:id_prod'
router.delete('/:id/products/:id_prod', CartController.deleteProductOfCart)

export default router
