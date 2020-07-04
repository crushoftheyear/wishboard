import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
    },
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString('hex'),
    },
    createdBoards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
      }
    ]
  }
)

module.exports = mongoose.model('User', userSchema)