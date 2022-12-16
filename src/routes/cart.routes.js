import { Router } from 'express'
import CartController from '../controllers/cart.controllers.js'

const router = Router()

router.get('/products', CartController.getProductsOfCart)

router.post('/products/:id_prod/:qty?', CartController.addProductToCart)

router.delete('/products/:id_prod/:qty?', CartController.deleteProductOfCart)

router.post('/submit', CartController.submitOrder)

export default router
