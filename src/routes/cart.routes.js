import { Router } from 'express'
import cartController from '../controllers/cart.controllers.js'

const router = Router()

router.post('/', cartController.createCart)
router.delete('/:id', cartController.deleteCart)
router.get('/:id/productos', cartController.getProductsByCartId)
router.post('/:id/productos/:id_prod', cartController.addProductToCart)
router.delete('/:id/productos/:id_prod', cartController.deleteProductOfCart)

export default router
