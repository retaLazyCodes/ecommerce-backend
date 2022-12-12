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
