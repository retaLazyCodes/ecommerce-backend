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

export const Order = model('Order', schema)
