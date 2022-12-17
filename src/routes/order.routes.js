import { Router } from 'express'
import OrderController from '../controllers/order.controllers.js'

const router = Router()

/**
 * @swagger
 * tags:
 *  name: Orders
 *  description: Orders endpoints
 */

/**
 * @swagger
 * paths:
 *  /api/orders:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all orders of the authenticated user
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Return all orders created by the user
 *       401:
 *         description: You do not have necessary permissions to get the resource
 */
router.get('/', OrderController.getOrder)

/**
 * @swagger
 * paths:
 *  /api/orders/{orderId}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a order by Id
 *     tags: [Orders]
 *     parameters:
 *      - in: path
 *        name: orderId
 *        type: string
 *        required: true
 *        example: 60f86030c4970119bf774bb8
 *     responses:
 *       200:
 *         description: Return the requested order
 *       401:
 *         description: You do not have necessary permissions to get the resource
 *       404:
 *         description: The requested order was not found
 */
router.get('/:orderId', OrderController.getOrderById)

/**
 * @swagger
 * paths:
 *  /api/orders/complete/{orderId}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Update the status of the requested order
 *     tags: [Orders]
 *     parameters:
 *      - in: path
 *        name: orderId
 *        type: string
 *        required: true
 *        example: 60f86030c4970119bf774bb8
 *     responses:
 *       200:
 *         description: Status of order updated successfully
 *       400:
 *         description: The requested order is not in 'Generated' state
 *       401:
 *         description: You do not have necessary permissions to get the resource
 *       404:
 *         description: The requested order was not found
 */
router.post('/complete/:orderId', OrderController.completeOrder)

export default router
