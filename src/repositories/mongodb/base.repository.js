import mongoose from 'mongoose'
import productDTO from '../../dto/productDTO.js'

export class MongoBaseRepository {
  constructor (dao, entityModel) {
    this.dao = dao
    this.EntityModel = mongoose.model(entityModel.collection, entityModel.schema)
  }

  async get (id) {
    if (!id) {
      const products = await this.dao.get()
      if (products) return productDTO.productSimplified(products)
      else return {}
    }
    return await this.dao.get(id)
  }

  async create (entity) {
    return await this.dao.create(new this.EntityModel(entity))
  }

  async update (id, entity) {
    return await this.dao.update(id, entity)
  }

  async delete (id) {
    await this.dao.delete(id)
    return true
  }
}
