const BaseService = require('../base/base.service')

class CartService extends BaseService {
  constructor (CartRepository) {
    super(CartRepository)
    this._cartRepository = CartRepository
  }

  async getProducts (id) {
    return await this._cartRepository.getProducts(id)
  }

  async addProduct (id, productId) {
    return await this._cartRepository.addProduct(id, productId)
  }

  async deleteProduct (id, productId) {
    return await this._cartRepository.deleteProduct(id, productId)
  }
}

module.exports = CartService
