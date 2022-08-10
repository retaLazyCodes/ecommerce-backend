import { FirebaseBaseRepository } from './base.repository.js'
import { FirebaseProductRepository } from './product.repository.js'
import { getDatabase } from '../../config/db/firebase.js'

export class FirebaseCartRepository extends FirebaseBaseRepository {
  constructor () {
    super(getDatabase(), 'carts')
  }

  async getProducts (id) {
    const error = new Error()
    error.status = 400
    error.message = 'NotImplementedError'
    throw error
  }

  async addProduct (id, productId) {
    const error = new Error()
    error.status = 400
    error.message = 'NotImplementedError'
    throw error
  }

  async deleteProduct (id, productId) {
    const error = new Error()
    error.status = 400
    error.message = 'NotImplementedError'
    throw error
  }

  async #getCartAndProduct (id, productId) {
    const cart = await this.model.findById(id)
    if (!cart) {
      throw new Error('Cart not found')
    }
    const productRepository = new FirebaseProductRepository()
    const product = await productRepository.get(productId)
    if (!product) {
      throw new Error('Product not found')
    }
    return { cart, product }
  }
}
