const BaseRepository = require('./base.repository')
const Product = require('../../models/Product')

class ProductRepository extends BaseRepository {
  constructor () {
    super(Product)
  }
}

module.exports = ProductRepository
