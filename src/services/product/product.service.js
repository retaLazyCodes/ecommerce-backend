import { BaseService } from '../base/base.service.js'

export class ProductService extends BaseService {
  constructor (productRepository) {
    super(productRepository)
    this._productRepository = productRepository
  }

  static getInstance (productRepository) {
    if (!this.instance) {
      this.instance = new ProductService(productRepository)
    }
    return this.instance
  }
}
