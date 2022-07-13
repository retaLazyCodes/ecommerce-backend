const Product = require('../models/Product')
const Service = require('../services/product/ProductService')
const { config } = require('../config/')

const service = new Service(config.FILESYSTEM_DB.products)

exports.getProducts = (request, response, next) => {
  try {
    const productId = request.params.id
    if (productId) {
      const product = service.getById(productId)
      product !== null
        ? response.status(200).json({ product, success: true })
        : response.status(404).json({ product, success: false })
    } else {
      const products = service.getAll()
      response.status(200).json({ products, success: true })
    }
  } catch (error) {
    next(error)
  }
}

exports.createProduct = async (request, response, next) => {
  try {
    const { name, price, description, code, stock, thumbnail } = request.body
    const product = new Product(name, price, description, code, stock, thumbnail)
    const productId = await service.create(product)

    response.status(201).json({ id: productId, success: true })
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (request, response, next) => {
  try {
    response.status(204).json({ success: true })
  } catch (error) {
    next(error)
  }
}

exports.deleteProduct = (request, response, next) => {
  try {
    response.status(204).json({ success: true })
  } catch (error) {
    next(error)
  }
}
