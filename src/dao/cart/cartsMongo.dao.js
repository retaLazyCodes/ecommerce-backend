import mongoose from 'mongoose'
import { BaseMongoDao } from '../base/baseMongo.dao.js'
import cartModel from '../../models/cart.model.js'

export default class CartMongoDao extends BaseMongoDao {
  constructor () {
    super(mongoose.model(cartModel.collection, cartModel.schema))
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new CartMongoDao()
    }
    return this.instance
  }
}
