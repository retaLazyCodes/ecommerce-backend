const Product = require('../models/Product')
const ProductService = require('../services/product/product.service.js')
const { ProductRepository } = require('../repositories/index')
const { config } = require('../config/')

const service = new ProductService(new ProductRepository())

exports.getProducts = async (request, response, next) => {
  try {
    const productId = request.params.id
    if (productId) {
      const product = await service.get(productId)
      response.status(200).json({ product, success: true })
    } else {
      const products = await service.get()
      response.status(200).json({ products, success: true })
    }
  } catch (error) {
    next(error)
  }
}

exports.createProduct = async (request, response, next) => {
  try {
    const { name, price, description, code, stock, thumbnail } = request.body
    const product = new Product({ name, price, description, code, stock, thumbnail })
    const newProduct = await service.create(product)
    response.status(201).json({ product: newProduct, success: true })
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (request, response, next) => {
  try {
    const productId = request.params.id
    const { name, price, description, code, stock, thumbnail } = request.body
    const product = { name, price, description, code, stock, thumbnail }
    service.update(productId, product).then(() => {
      response.status(204).json({ success: true })
    })
      .catch(next)
  } catch (error) {
    next(error)
  }
}

exports.deleteProduct = async (request, response, next) => {
  try {
    const productId = request.params.id
    await service.delete(productId).then(() => {
      response.status(204).json({ success: true })
    })
      .catch(next)
  } catch (error) {
    next(error)
  }
}
