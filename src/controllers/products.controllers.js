import { Product } from '../models/Product.js'
import { ProductService } from '../services/index.js'
import { MongoProductRepository, FirebaseProductRepository } from '../repositories/index.js'
import { config } from '../config/index.js'
import { logger } from '../config/logger.js'

const service = config.DB_SERVICE === 'MONGO'
  ? new ProductService(new MongoProductRepository())
  : new ProductService(new FirebaseProductRepository())

const getProducts = async (req, res, next) => {
  try {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    const productId = req.params.id
    if (productId) {
      const product = await service.get(productId)
      res.status(200).json({ product, success: true })
    } else {
      const products = await service.get()
      res.status(200).json({ products, success: true })
    }
  } catch (error) {
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    const { name, price, description, code, stock, thumbnail } = req.body
    const product = new Product({
      name,
      price,
      description,
      code,
      stock,
      thumbnail,
      timestamp: new Date()
    })
    const newProduct = await service.create(product)
    res.status(201).json({ product: newProduct, success: true })
  } catch (error) {
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    const productId = req.params.id
    const { name, price, description, code, stock, thumbnail } = req.body
    const product = { name, price, description, code, stock, thumbnail }
    service.update(productId, product).then(() => {
      res.status(204).json({ success: true })
    })
      .catch(next)
  } catch (error) {
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    const productId = req.params.id
    await service.delete(productId).then(() => {
      res.status(204).json({ success: true })
    })
      .catch(next)
  } catch (error) {
    next(error)
    logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`)
  }
}

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  service
}
