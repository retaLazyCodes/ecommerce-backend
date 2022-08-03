const BaseService = require('../base/base.service')

class ProductService extends BaseService {
  constructor (ProductRepository) {
    super(ProductRepository)
    this._productRepository = ProductRepository
  }
}

module.exports = ProductService
