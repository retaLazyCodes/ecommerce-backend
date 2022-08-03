const BaseRepository = require('./base.repository')
const ProductRepository = require('./product.repository')
const Cart = require('../../models/Cart')

class CartRepository extends BaseRepository {
  constructor () {
    super(Cart)
  }

  async getProducts (id) {
    return await this.model.findById(id)
  }

  async addProduct (id, productId) {
    const { cart, product } = await this.#getCartAndProduct(id, productId)
    cart.products.push(product)
    const filter = id
    const update = { products: cart.products }
    return await this.model.findByIdAndUpdate(filter, update)
  }

  async deleteProduct (id, productId) {
    const { cart } = await this.#getCartAndProduct(id, productId)
    const filteredProducts = cart.products.filter(product => {
      return product._id.toString() !== productId
    })
    const filter = id
    const update = { products: filteredProducts }
    return await this.model.findByIdAndUpdate(filter, update)
  }

  async #getCartAndProduct (id, productId) {
    const cart = await this.model.findById(id)
    if (!cart) {
      throw new Error('Cart not found')
    }
    const productRepository = new ProductRepository()
    const product = await productRepository.get(productId)
    if (!product) {
      throw new Error('Product not found')
    }
    return { cart, product }
  }
}

module.exports = CartRepository
