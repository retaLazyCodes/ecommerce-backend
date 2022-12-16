import { MongoBaseRepository } from './base.repository.js'
import CartMongoDao from '../../dao/cart/cartsMongo.dao.js'
import mongoose from 'mongoose'
import cartModel from '../../models/cart.model.js'
import { Order } from '../../models/order.model.js'
import productsController from '../../controllers/products.controllers.js'

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

  async submitOrder (userId) {
    const cart = await this.getProducts(userId)
    const products = await productsController.service.get()
    if (cart) {
      const newArrayOfIds = []
      const cartItems = cart[0].items
      const cartItemsCopy = [...cartItems]

      cartItems.forEach((item) => {
        newArrayOfIds.push(item.productId)
      })

      function getPriceOfProduct (allProducts, cartItemId) {
        let indexProduct = 0
        indexProduct = allProducts.findIndex((prod) => {
          return prod.id.equals(cartItemId)
        })

        if (indexProduct !== -1) {
          const productPrice = allProducts[indexProduct].price
          return productPrice
        }
      }

      function generateArrayOfCartItemsWPrice (cartItemsCopy, newArrayOfIds) {
        for (let index = 0; index < newArrayOfIds.length; index++) {
          const cartItemId = newArrayOfIds[index].toString()
          const price = getPriceOfProduct(products, cartItemId)
          cartItemsCopy[index].productPrice = price
        }
        return cartItemsCopy
      }

      const arrayProductsWithPrice = generateArrayOfCartItemsWPrice(
        cartItemsCopy,
        newArrayOfIds
      )

      const totalPrice = arrayProductsWithPrice.reduce(
        (accum, item) => accum + item.productQty * item.productPrice,
        0
      )

      const newOrder = new Order({
        userId,
        items: [...arrayProductsWithPrice],
        total: totalPrice
      })
      const createdOrder = await newOrder.save()
      return createdOrder
    }
    return null
  }
}
