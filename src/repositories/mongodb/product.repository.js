import { MongoBaseRepository } from './base.repository.js'
import ProductMongoDao from '../../dao/product/productsMongo.dao.js'
import productModel from '../../models/product.model.js'

export class MongoProductRepository extends MongoBaseRepository {
  constructor () {
    super(ProductMongoDao.getInstance(), productModel)
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new MongoProductRepository()
    }
    return this.instance
  }
}
