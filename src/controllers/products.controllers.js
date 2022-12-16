import PersistenceFactory from '../config/Factory.js'
import { logger } from '../config/logger.js'

class ProductController {
  constructor () {
    this.service = this.#getPersistenceService()
  }

  #getPersistenceService = () => {
    PersistenceFactory.getPersistence().then((data) => {
      this.service = data.productService
    })
  }

  getProducts = async (req, res, next) => {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const productId = req.params.id
      if (productId) {
        const product = await this.service.get(productId)
        res.status(200).json({ product, success: true })
      } else {
        const products = await this.service.get()
        res.status(200).json({ products, success: true })
      }
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }

  createProduct = async (req, res, next) => {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const { name, price, description, code, stock, thumbnail } = req.body
      const product = {
        name,
        price,
        description,
        code,
        stock,
        thumbnail
      }
      const newProduct = await this.service.create(product)
      res.status(201).json({ createdProduct: newProduct, success: true })
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }

  updateProduct = async (req, res, next) => {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const productId = req.params.id
      const { name, price, description, code, stock, thumbnail } = req.body
      const product = { name, price, description, code, stock, thumbnail }
      this.service.update(productId, product).then(() => {
        res.status(200).json({ success: true, message: 'Product updated successful' })
      })
        .catch(next)
    } catch (error) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      next(error)
    }
  }

  deleteProduct = async (req, res, next) => {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`)
      const productId = req.params.id
      await this.service.delete(productId).then(() => {
        res.status(200).json({ success: true, message: 'Product deleted successful' })
      })
        .catch(next)
    } catch (error) {
      next(error)
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    }
  }
}

export default new ProductController()
