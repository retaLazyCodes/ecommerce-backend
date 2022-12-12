export class BaseMongoDao {
  constructor (model) {
    this.model = model
  }

  async get (id) {
    if (!id) {
      return await this.model.find().lean()
    }
    return await this.model.findById(id).lean()
  }

  async create (entity) {
    return await this.model.create(entity)
  }

  async update (id, entity) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true })
  }

  async delete (id) {
    await this.model.findByIdAndDelete(id)
    return true
  }
}
