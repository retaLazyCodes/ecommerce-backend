import mongoose from 'mongoose'
const { Schema, model } = mongoose

const cartSchema = new Schema({
  timestamp: Date,
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
})

cartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Cart = model('Cart', cartSchema)
