import { Router } from 'express'
import OrderController from '../controllers/order.controllers.js'

const router = Router()

router.get('/', OrderController.getOrder)

router.get('/:orderId', OrderController.getOrderById)

router.post('/complete/:orderId', OrderController.completeOrder)

export default router
