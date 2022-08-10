import { MongoBaseRepository } from './base.repository.js'
import { Product } from '../../models/Product.js'

export class MongoProductRepository extends MongoBaseRepository {
  constructor () {
    super(Product)
  }
}
