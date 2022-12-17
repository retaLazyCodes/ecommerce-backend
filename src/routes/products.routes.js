import { Router } from 'express'
import passport from 'passport'
import ProductController from '../controllers/products.controllers.js'
import { isAdminFunc } from '../middlewares/auth.js'
const passportOK = passport.authenticate('jwt', { session: false })

const router = Router()

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Products endpoints
 */

/**
 * @swagger
 * paths:
 *  /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Return all stored products
 */
router.get('/', ProductController.getProducts)

/**
 * @swagger
 * paths:
 *  /api/products/{id}:
 *   get:
 *     summary: Get a product by Id
 *     tags: [Products]
 *     parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        example: 60f86030c4970119bf774bb8
 *     responses:
 *       200:
 *         description: Return the requested product
 *       404:
 *         description: The requested product was not found
 */
router.get('/:id', ProductController.getProducts)

/**
 * @swagger
 * paths:
 *  /api/products:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Creates a new product
 *     tags: [Products]
 *     parameters:
 *       - in: body
 *         name: product
 *         description: The product to create.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - price
 *             - description
 *             - code
 *             - stock
 *           properties:
 *             name:
 *               type: string
 *               example: Yerba mate
 *             price:
 *               type: Number
 *               example: 500
 *             description:
 *               type: string
 *               example: Yerba mate elaborada con palo
 *             code:
 *               type: string
 *               example: 2F3
 *             stock:
 *               type: Number
 *               example: 50
 *     responses:
 *       201:
 *         description: Returns the created product
 *       401:
 *         description: You do not have necessary permissions to get the resource
 */
router.post('/', passportOK, isAdminFunc, ProductController.createProduct)

/**
 * @swagger
 * paths:
 *  /api/products/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example: 60f86030c4970119bf774bb8
 *       - in: body
 *         name: product
 *         description: The content to update.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - price
 *             - description
 *             - code
 *             - stock
 *           properties:
 *             name:
 *               type: string
 *               example: Yerba mate suave
 *             price:
 *               type: Number
 *               example: 300
 *             description:
 *               type: string
 *               example: Yerba mate Cachamate elaborada con palo
 *             code:
 *               type: string
 *               example: 2F3
 *             stock:
 *               type: Number
 *               example: 50
 *     responses:
 *       200:
 *         description: Product updated successful
 *       401:
 *         description: You do not have necessary permissions to get the resource
 *       404:
 *         description: The product was not found
 */
router.put('/:id', passportOK, isAdminFunc, ProductController.updateProduct)

/**
 * @swagger
 * paths:
 *  /api/products/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example: 60f86030c4970119bf774bb8
 *     responses:
 *       200:
 *         description: Product deleted successful
 *       401:
 *         description: You do not have necessary permissions for the resource
 *       404:
 *         description: The product was not found
 */
router.delete('/:id', passportOK, isAdminFunc, ProductController.deleteProduct)

export default router
