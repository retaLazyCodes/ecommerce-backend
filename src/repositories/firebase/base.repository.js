import * as uuid from 'uuid'

export class FirebaseBaseRepository {
  constructor (model, collectionName) {
    this.model = model
    this.collectionName = collectionName
    this.collection = model.collection(collectionName)
  }

  async get (id) {
    if (!id) {
      const response = await this.collection.get()
      return response.docs.map(doc => doc.data())
    }

    const response = await this.collection
      .where('id', '==', id).get()
    return response.docs.map(doc => doc.data())
  }

  async create (entity) {
    const entityDB = this.collection
    const response = await entityDB.doc(uuid.v1()).set(JSON.parse(JSON.stringify(entity)))
    return response
  }

  async update (id, entity) {
    const collection = this.collection

    collection.where('id', '==', id).get().then(response => {
      const batch = this.model.batch()
      response.docs.forEach((doc) => {
        const docRef = collection.doc(doc.id)
        batch.update(docRef, { ...entity })
      })
      batch.commit().then(() => {
        console.log(`document with id ${id} inside of ${this.collectionName} updated successfully `)
      })
    })
  }

  async delete (id) {
    const collection = this.collection

    collection.where('id', '==', id).get().then(response => {
      response.docs.forEach((doc) => {
        doc.ref.delete()
      })
    })
      .then(() => {
        console.log(`document with id ${id} inside of ${this.collectionName} deleted successfully `)
      })
  }
}
