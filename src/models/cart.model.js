import mongoose from 'mongoose'
const { Schema } = mongoose

const collection = 'Cart'

const schema = new Schema({
  timestamp: Date,
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
})

schema.post(['find', 'findOne', 'findOneAndUpdate'], function (res) {
  if (!this.mongooseOptions().lean) {
    return
  }
  if (Array.isArray(res)) {
    res.forEach(transformDoc)
    return
  }
  transformDoc(res)
})

function transformDoc (doc) {
  doc.id = doc._id
  delete doc._id
  delete doc.__v
}

export default {
  collection,
  schema
}
