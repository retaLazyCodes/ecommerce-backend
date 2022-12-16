import PersistenceFactory from '../config/Factory.js'
import { logger } from '../config/logger.js'

class CartController {
  constructor () {
    this.service = this.#getPersistenceService()
  }

  #getPersistenceService = () => {
    PersistenceFactory.getPersistence().then((data) => {
      this.service = data.cartService
    })
  }

  getProductsOfCart = async (req, res, next) => {
    const userId = req.user._id
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const cart = await this.service.getProducts(userId)
      if (cart) {
        res.status(200).json({ products: cart[0].items, success: true })
      } else {
        res.status(404).json({ success: false })
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

  submitOrder = (req, res, next) => {
    const error = new Error()
    error.status = 500
    error.message = 'Method not implemented'
    throw error
  }
}

export default new CartController()
