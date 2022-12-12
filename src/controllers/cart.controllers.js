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

  createCart = async (req, res, next) => {
    try {
      const cart = { timestamp: new Date(), products: [] }
      const cartId = await this.service.create(cart)
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      res.status(201).json({ id: cartId, success: true })
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }

  deleteCart = (req, res, next) => {
    try {
      const cartId = req.params.id
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      this.service.delete(cartId).then(() => {
        res.status(204).json({ success: true })
      })
        .catch(next)
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }

  getProductsByCartId = async (req, res, next) => {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const cartId = req.params.id
      const products = await this.service.getProducts(cartId)
      if (products) {
        res.status(200).json({ products, success: true })
      } else {
        res.status(404).json({ success: false })
      }
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }

  addProductToCart = async (req, res, next) => {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const cartId = req.params.id
      const productId = req.params.id_prod
      await this.service.addProduct(cartId, productId)
      res.status(201).json({ success: true })
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }

  deleteProductOfCart = async (req, res, next) => {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const cartId = req.params.id
      const productId = req.params.id_prod
      await this.service.deleteProduct(cartId, productId)
      res.status(204).json({ success: true })
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }
}

export default new CartController()
