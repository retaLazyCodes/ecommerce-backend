const Cart = require('../models/Cart')
const CartService = require('../services/cart/CartService')
const ProductService = require('../services/product/ProductService')
const { config } = require('../config/')

const service = new CartService(config.FILESYSTEM_DB.carts)
const productService = new ProductService(config.FILESYSTEM_DB.products)

exports.createCart = async (request, response, next) => {
  try {
    const cart = new Cart()
    const cartId = await service.create(cart)
    response.status(201).json({ id: cartId, success: true })
  } catch (error) {
    next(error)
  }
}

exports.deleteCart = (request, response, next) => {
  try {
    const cartId = request.params.id
    service.deleteById(cartId).then(() => {
      response.status(204).json({ success: true })
    })
  } catch (error) {
    next(error)
  }
}

exports.getProductsByCartId = (request, response, next) => {
  try {
    const cartId = request.params.id
    const cart = service.getById(cartId)
    if (cart !== null) {
      response.status(200).json({ products: cart._products, success: true })
    }
    response.status(404).json({ success: false })
  } catch (error) {
    next(error)
  }
}

exports.addProductToCart = async (request, response, next) => {
  try {
    const cartId = request.params.id
    const productId = request.params.id_prod
    const product = await productService.getById(productId)
    if (product !== null) {
      service.addProductToCart(cartId, product)
    }

    response.status(201).json({ success: true })
  } catch (error) {
    next(error)
  }
}

exports.deleteProductOfCart = async (request, response, next) => {
  try {
    const cartId = request.params.id
    const productId = request.params.id_prod
    await service.deleteProductOfCart(cartId, productId)
    response.status(204).json({ success: true })
  } catch (error) {
    next(error)
  }
}
