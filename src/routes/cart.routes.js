import { Router } from 'express'
import CartController from '../controllers/cart.controllers.js'

const router = Router()

/**
 * @swagger
 * tags:
 *  name: Cart
 *  description: Cart endpoints
 */

/**
 * @swagger
 * paths:
 *  /api/cart/products:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all products in user cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Return all products in user cart
 *       401:
 *         description: You do not have necessary permissions to get the resource
 */
router.get('/products', CartController.getCart)

/**
 * @swagger
 * paths:
 *  /api/cart/products/{id_prod}/{qty}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add a product to user cart, specifying the amount
 *     tags: [Cart]
 *     parameters:
 *      - in: path
 *        name: id_prod
 *        type: string
 *        required: true
 *        example: 60f86030c4970119bf774bb8
 *      - in: path
 *        name: qty
 *        type: Number
 *        required: false
 *        minimum: 1
 *        default: 1
 *     responses:
 *       201:
 *         description: Product added to the user cart successful
 *       401:
 *         description: You do not have necessary permissions to get the resource
 *       404:
 *         description: The requested product was not found
 */
router.post('/products/:id_prod/:qty?', CartController.addProductToCart)

/**
 * @swagger
 * paths:
 *  /api/cart/products/{id_prod}/{qty}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a specific quantity of a product from user cart
 *     tags: [Cart]
 *     parameters:
 *      - in: path
 *        name: id_prod
 *        type: string
 *        required: true
 *        example: 60f86030c4970119bf774bb8
 *      - in: path
 *        name: qty
 *        type: Number
 *        required: false
 *        minimum: 1
 *        default: 1
 *     responses:
 *       200:
 *         description: Product removed to the user cart successful
 *       401:
 *         description: You do not have necessary permissions to get the resource
 *       404:
 *         description: The requested product was not found
 */
router.delete('/products/:id_prod/:qty?', CartController.deleteProductOfCart)

/**
 * @swagger
 * paths:
 *  /api/cart/submit:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Generate a order with products of cart
 *     tags: [Cart]
 *     responses:
 *       201:
 *         description: Order generated successfuly
 *       401:
 *         description: You do not have necessary permissions to get the resource
 */
router.post('/submit', CartController.submitOrder)

export default router
