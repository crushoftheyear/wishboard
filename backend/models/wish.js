import mongoose from 'mongoose'

const wishSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 40
    },
    description: {
      type: String
    },
    category: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String
    },
    url: {
      type: String
    },
    priority: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: () => new Date()
    }
  }
)

module.exports = mongoose.model('Wish', wishSchema)