import { MongoBaseRepository } from './base.repository.js'
import { MongoProductRepository } from './product.repository.js'
import CartMongoDao from '../../dao/cart/cartsMongo.dao.js'
import mongoose from 'mongoose'
import cartModel from '../../models/cart.model.js'

export class MongoCartRepository extends MongoBaseRepository {
  constructor () {
    super(CartMongoDao.getInstance(), cartModel)
    this.model = mongoose.model(cartModel.collection, cartModel.schema)
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new MongoCartRepository()
    }
    return this.instance
  }

  async getProducts (id) {
    return await this.model.find({ userId: id }).lean()
  }

  async addProduct (params) {
    const {
      userId,
      productId,
      qty
    } = params

    const cart = await this.getProducts(userId)
    if (cart.length) {
      const cartItems = cart[0].items

      const indexOfItem = cartItems.findIndex(
        (el) => el.productId.equals(productId)
      )

      // Si el producto ya se encuentra en el carrito:
      if (indexOfItem !== -1) {
        cartItems[indexOfItem].productQty += qty

        // Si el producto no se encuentra en el carrito
      } else {
        const newItem = {
          productId,
          productQty: qty
        }
        cartItems.push(newItem)
      }
      await this.model.updateOne(
        { userId },
        { $set: { items: cartItems } }
      )
    }
  }

  async deleteProduct (params) {
    const {
      userId,
      productId,
      qty
    } = params

    const cart = await this.getProducts(userId)
    if (cart.length) {
      const cartItems = cart[0].items

      const indexOfItem = cartItems.findIndex(
        (el) => el.productId.equals(productId)
      )

      if (indexOfItem !== -1) {
        if (cartItems[indexOfItem].productQty < qty) {
          const error = new Error()
          error.status = 400
          error.message = 'Quantity greater than existing in the cart'
          throw error
        }
        cartItems[indexOfItem].productQty -= qty
      } else {
        const error = new Error()
        error.status = 404
        error.message = 'Product not found in the cart'
        throw error
      }
      // Si el producto a quitar queda con cantidad cero, se elimina del carrito
      if (indexOfItem !== -1 && cartItems[indexOfItem].productQty === 0) {
        cartItems.splice(indexOfItem, 1)
      }
      await this.model.updateOne(
        { userId },
        { $set: { items: cartItems } }
      )
    }
  }

  async #getCartAndProduct (id, productId) {
    const cart = await this.model.findById(id)
    if (!cart) {
      throw new Error('Cart not found')
    }
    const productRepository = new MongoProductRepository()
    const product = await productRepository.get(productId)
    if (!product) {
      throw new Error('Product not found')
    }
    return { cart, product }
  }

  async submitOrder (params) {
    // TODO:
  }
}
