import { Cart } from '../models/Cart.js'
import { CartService } from '../services/index.js'
import { MongoCartRepository, FirebaseCartRepository } from '../repositories/index.js'
import { config } from '../config/index.js'

const service = config.DB_SERVICE === 'MONGO'
  ? new CartService(new MongoCartRepository())
  : new CartService(new FirebaseCartRepository())

const createCart = async (request, response, next) => {
  try {
    const cart = new Cart({ timestamp: new Date() })
    const cartId = await service.create(cart)
    response.status(201).json({ id: cartId, success: true })
  } catch (error) {
    next(error)
  }
}

const deleteCart = (request, response, next) => {
  try {
    const cartId = request.params.id
    service.delete(cartId).then(() => {
      response.status(204).json({ success: true })
    })
      .catch(next)
  } catch (error) {
    next(error)
  }
}

const getProductsByCartId = async (request, response, next) => {
  try {
    const cartId = request.params.id
    const products = await service.getProducts(cartId)
    if (products) {
      response.status(200).json({ products, success: true })
    } else {
      response.status(404).json({ success: false })
    }
  } catch (error) {
    next(error)
  }
}

const addProductToCart = async (request, response, next) => {
  try {
    const cartId = request.params.id
    const productId = request.params.id_prod
    await service.addProduct(cartId, productId)
    response.status(201).json({ success: true })
  } catch (error) {
    next(error)
  }
}

const deleteProductOfCart = async (request, response, next) => {
  try {
    const cartId = request.params.id
    const productId = request.params.id_prod
    await service.deleteProduct(cartId, productId)
    response.status(204).json({ success: true })
  } catch (error) {
    next(error)
  }
}

export default {
  createCart,
  deleteCart,
  getProductsByCartId,
  addProductToCart,
  deleteProductOfCart
}
