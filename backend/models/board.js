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
    theme: {
      type: String,
      required: true
    },
    wishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wish'
      }
    ],
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: () => new Date()
    }
  }
)

module.exports = mongoose.model('Board', boardSchema)