export class BaseService {
  constructor (Repository) {
    this.repository = Repository
  }

  async get (id) {
    const entity = await this.repository.get(id)
    if (!entity) {
      const error = new Error()
      error.status = 404
      error.message = 'Entity not found'
      throw error
    }
    return entity
  }

  async create (entity) {
    return await this.repository.create(entity)
  }

  async update (id, entity) {
    return await this.repository.update(id, entity)
  }

  async delete (id) {
    await this.repository.delete(id)
  }
}
