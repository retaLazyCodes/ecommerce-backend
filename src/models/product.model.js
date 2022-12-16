import mongoose from 'mongoose'
const { Schema } = mongoose

const collection = 'Product'

const schema = new Schema({
  timestamp: Date,
  name: String,
  description: String,
  code: String,
  price: Number,
  stock: Number,
  thumbnail: String,
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' }
})

schema.post(['find', 'findOne', 'findOneAndUpdate'], function (res) {
  if (!this.mongooseOptions().lean) {
    return
  }
  if (res) {
    if (Array.isArray(res)) {
      res.forEach(transformDoc)
      return
    }
    transformDoc(res)
  } else {
    return null
  }
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
