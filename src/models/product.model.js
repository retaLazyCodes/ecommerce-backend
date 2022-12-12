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

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default {
  collection,
  schema
}
