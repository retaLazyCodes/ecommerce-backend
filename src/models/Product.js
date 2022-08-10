import mongoose from 'mongoose'
const { Schema, model } = mongoose

const productSchema = new Schema({
  timestamp: Date,
  name: String,
  description: String,
  code: String,
  price: Number,
  stock: Number,
  thumbnail: String,
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' }
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Product = model('Product', productSchema)
