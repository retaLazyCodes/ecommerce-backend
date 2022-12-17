import mongoose from 'mongoose'
const { Schema, model } = mongoose

const schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        productQty: {
          type: Number
        },
        productPrice: {
          type: Number
        }
      }
    ],
    status: { type: String, default: 'Generated' },
    total: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
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

export const Order = model('Order', schema)
