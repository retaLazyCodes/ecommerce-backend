import { Cart } from '../models/Cart.js'
import { CartService } from '../services/index.js'
import { MongoCartRepository, FirebaseCartRepository } from '../repositories/index.js'
import { config } from '../config/index.js'
import { logger } from '../config/logger.js'

const service = config.DB_SERVICE === 'MONGO'
  ? new CartService(new MongoCartRepository())
  : new CartService(new FirebaseCartRepository())

const createCart = async (req, res, next) => {
  try {
    const cart = new Cart({ timestamp: new Date() })
    const cartId = await service.create(cart)
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    res.status(201).json({ id: cartId, success: true })
  } catch (error) {
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    next(error)
  }
}

const deleteCart = (req, res, next) => {
  try {
    const cartId = req.params.id
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    service.delete(cartId).then(() => {
      res.status(204).json({ success: true })
    })
      .catch(next)
  } catch (error) {
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    next(error)
  }
}

const getProductsByCartId = async (req, res, next) => {
  try {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    const cartId = req.params.id
    const products = await service.getProducts(cartId)
    if (products) {
      res.status(200).json({ products, success: true })
    } else {
      res.status(404).json({ success: false })
    }
  } catch (error) {
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    next(error)
  }
}

const addProductToCart = async (req, res, next) => {
  try {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    const cartId = req.params.id
    const productId = req.params.id_prod
    await service.addProduct(cartId, productId)
    res.status(201).json({ success: true })
  } catch (error) {
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    next(error)
  }
}

const deleteProductOfCart = async (req, res, next) => {
  try {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    const cartId = req.params.id
    const productId = req.params.id_prod
    await service.deleteProduct(cartId, productId)
    res.status(204).json({ success: true })
  } catch (error) {
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    next(error)
  }
}

export default {
  createCart,
  deleteCart,
  getProductsByCartId,
  addProductToCart,
  deleteProductOfCart,
  service
}
