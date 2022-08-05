import { Cart } from '../models/Cart.js'
import { CartService } from '../services/index.js'
import { CartRepository } from '../repositories/index.js'

const service = new CartService(new CartRepository())

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
    const cart = await service.getProducts(cartId)
    if (cart) {
      response.status(200).json({ products: cart.products, success: true })
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
