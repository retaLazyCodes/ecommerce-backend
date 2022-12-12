import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  age: Number,
  phone: String,
  avatar: String,
  cart_id: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const User = model('User', userSchema)
