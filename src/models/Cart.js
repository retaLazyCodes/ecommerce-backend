const { Schema, model } = require('mongoose')

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

const Cart = model('Cart', cartSchema)

module.exports = Cart
