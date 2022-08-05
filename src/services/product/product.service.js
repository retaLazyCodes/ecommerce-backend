import { BaseService } from '../base/base.service.js'

export class ProductService extends BaseService {
  constructor (ProductRepository) {
    super(ProductRepository)
    this._productRepository = ProductRepository
  }
}
