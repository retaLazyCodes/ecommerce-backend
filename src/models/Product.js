const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  timestamp: Date,
  name: String,
  description: String,
  code: String,
  price: Number,
  stock: Number,
  thumbnail: String
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Product = model('Product', productSchema)

module.exports = Product
