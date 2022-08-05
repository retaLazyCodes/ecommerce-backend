import { BaseRepository } from './base.repository.js'
import { Product } from '../../models/Product.js'

export class ProductRepository extends BaseRepository {
  constructor () {
    super(Product)
  }
}
