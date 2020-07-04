import mongoose from 'mongoose'
import crypto from 'crypto'

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 40
    },
    wishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wish'
      }
    ],
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString('hex'),
    },
    theme: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: () => new Date()
    }
  }
)

module.exports = mongoose.model('Board', boardSchema)