import { BaseService } from '../base/base.service.js'

export class CartService extends BaseService {
  constructor (cartRepository) {
    super(cartRepository)
    this._cartRepository = cartRepository
  }

  static getInstance (cartRepository) {
    if (!this.instance) {
      this.instance = new CartService(cartRepository)
    }
    return this.instance
  }

  async getProducts (id) {
    return await this._cartRepository.getProducts(id)
  }

  async addProduct (params) {
    return await this._cartRepository.addProduct(params)
  }

  async deleteProduct (params) {
    return await this._cartRepository.deleteProduct(params)
  }

  async submitOrder (params) {
    return await this._cartRepository.submitOrder(params)
  }
}
