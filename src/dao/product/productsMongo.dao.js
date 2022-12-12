import mongoose from 'mongoose'
import { BaseMongoDao } from '../base/baseMongo.dao.js'
import productModel from '../../models/product.model.js'

export default class ProductMongoDao extends BaseMongoDao {
  constructor () {
    super(mongoose.model(productModel.collection, productModel.schema))
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new ProductMongoDao()
    }
    return this.instance
  }
}
