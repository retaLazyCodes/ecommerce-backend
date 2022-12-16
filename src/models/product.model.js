import mongoose from 'mongoose'
const { Schema } = mongoose

const collection = 'Product'

const schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: false }
},
{
  timestamps: true
})

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

export default {
  collection,
  schema
}
