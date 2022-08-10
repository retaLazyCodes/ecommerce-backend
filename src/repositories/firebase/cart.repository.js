import { FirebaseBaseRepository } from './base.repository.js'
import { FirebaseProductRepository } from './product.repository.js'
import { getDatabase } from '../../config/db/firebase.js'

export class FirebaseCartRepository extends FirebaseBaseRepository {
  constructor () {
    super(getDatabase(), 'carts')
  }

  async getProducts (id) {
    const cart = await this.get(id)
    if (cart[0]?.products) {
      return cart[0].products
    }
    return null
  }

  async addProduct (id, productId) {
    const { cart, product } = await this.#getCartAndProduct(id, productId)
    cart.products.push(product)
    const filter = id
    const update = { products: cart.products }
    return await this.update(filter, update)
  }

  async deleteProduct (id, productId) {
    const { cart } = await this.#getCartAndProduct(id, productId)
    const filteredProducts = cart.products.filter(product => {
      return product.id.toString() !== productId
    })
    const filter = id
    const update = { products: filteredProducts }
    return await this.update(filter, update)
  }

  async #getCartAndProduct (id, productId) {
    const cart = await this.get(id)
    if (!cart) {
      throw new Error('Cart not found')
    }
    const productRepository = new FirebaseProductRepository()
    const product = await productRepository.get(productId)
    if (!product) {
      throw new Error('Product not found')
    }
    return { cart: cart[0], product: product[0] }
  }
}
