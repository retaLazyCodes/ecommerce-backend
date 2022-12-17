import PersistenceFactory from '../config/Factory.js'
import { logger } from '../config/logger.js'
import { sendMail } from '../config/nodemailer.config.js'
import { sendSMS } from '../config/twilio-sms.config.js'

class CartController {
  constructor () {
    this.service = this.#getPersistenceService()
  }

  #getPersistenceService = () => {
    PersistenceFactory.getPersistence().then((data) => {
      this.service = data.cartService
    })
  }

  getCart = async (req, res, next) => {
    const userId = req.user._id
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const cart = await this.service.getProducts(userId)
      if (cart[0].items.length > 0) {
        res.status(200).json({ products: cart[0].items, success: true })
      } else {
        res.status(200).json({ message: 'Carrito vacío', success: true })
      }
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }

  addProductToCart = async (req, res, next) => {
    const userId = req.user._id
    const productId = req.params.id_prod
    const qty = req.params.qty || 1
    const params = {
      userId,
      productId,
      qty: parseInt(qty)
    }
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      await this.service.addProduct(params)
      res.status(201).json({ success: true, message: 'Product Successfuly added to cart' })
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }

  deleteProductOfCart = async (req, res, next) => {
    const userId = req.user._id
    const productId = req.params.id_prod
    const qty = req.params.qty || 1
    const params = {
      userId,
      productId,
      qty: parseInt(qty)
    }
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      await this.service.deleteProduct(params)
      res.status(200).json({ success: true, message: 'Product Successfuly deleted from cart' })
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }

  submitOrder = async (req, res, next) => {
    const userId = req.user._id
    const { name, email, phone } = req.user
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const createdOrder = await this.service.submitOrder(userId)
      if (createdOrder) {
        await sendMail(
          email,
          `Nuevo pedido de ${name} ${email}`,
          'orden_generada',
          JSON.stringify(createdOrder)
        )
        await sendSMS(
          `Nuevo pedido a nombre de ${name} ${email} fue recibido. Su estado actual es ${createdOrder.status}.\nOrden:\n${JSON.stringify(createdOrder)}\nTotal: $ ${createdOrder.total}`,
          phone
        )
        res.status(201).json({ success: true, message: 'Order submitted successfully' })
      } else {
        res.status(500).json({ success: true, message: 'An error occurred while trying to generate the order' })
      }
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }
}

export default new CartController()
