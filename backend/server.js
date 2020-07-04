import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

import Board from './models/board'
import Wish from './models/wish'
import User from './models/user'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/wishboard'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

const listEndpoints = require('express-list-endpoints')

// Messages
const CREATED_BOARD = 'Created board success'
const CREATED_WISH = 'Created wish success'
const DELETED_BOARD = 'Deleted board'
const DELETED_WISH = 'Deleted wish'
const ERR_CREATE_USER = 'Could not create user'
const ERR_LOGIN = 'Could not log in'
const ERR_USER_INFO = 'Could not get user info'
const ERR_LOGGED_OUT = 'Please try logging in again'
const ERR_ACCESSTOKEN = 'Accesstoken is wrong or missing'
const ERR_CREATE_BOARD = 'Could not create Board'
const ERR_CREATE_WISH = 'Could not create Wish'
const ERR_DISPLAY_BOARD = 'Could not display Board'
const ERR_DISPLAY_WISH = 'Could not display Wish'
const ERR_DELETE_BOARD = 'Could not delete board'
const ERR_DELETE_WISH = 'Could not delete wish'

app.use(cors())
app.use(bodyParser.json())


const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({
    accessToken: req.header('Authorization')
  })
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ loggedOut: true })
  }
}

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Sign up
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    const newUser = await user.save()

    res.status(201).json({
      id: newUser._id,
      accessToken: newUser.accessToken,
      name: user.name
    })
  } catch (err) {
    res.status(400).json({
      message: ERR_CREATE_USER,
      errors: err.errors
    })
  }
})

// Log in
app.post('/sessions', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json(user)
    } else {
      res.status(404).json({
        message: ERR_LOGIN,
        errors: err.errors
      })
    }
  } catch (err) {
    res.status(404).json({
      message: ERR_LOGIN,
      errors: err.errors
    })
  }
})

// Get user info including boards
app.get('/users/:userId', authenticateUser)
app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findOne({ _id: userId })
      .populate('createdBoards')

    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({
      message: ERR_USER_INFO,
      errors: err.errors
    })
  }
})

// Create new Board
app.post('/users/:userId/boards', authenticateUser)
app.post('/users/:userId/boards', async (req, res) => {
  const { userId } = req.params
  const { title, theme } = req.body

  try {
    const newBoard = await new Board({
      title,
      theme,
      createdBy: userId
    }).save()

    // Push new board into Users createdBoards array
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { createdBoards: newBoard._id } }
    ).populate('createdBoards')

    res.status(201).json({
      message: CREATED_BOARD,
      id: newBoard._id,
      newBoard
    })
  } catch (err) {
    res.status(400).json({
      message: ERR_CREATE_BOARD,
      errors: err.errors
    })
  }
})

// Create new Wish
app.post('/boards/:boardId', authenticateUser)
app.post('/boards/:boardId', async (req, res) => {
  const { boardId } = req.params
  const { title, description, category, imgUrl, url, rank } = req.body

  try {
    const newWish = await new Wish({
      title,
      description,
      category,
      imgUrl,
      url,
      rank,
      boardParent: boardId
    })

    newWish.save((err, newWish) => {

      if (newWish) {
        res.status(201).json({
          message: CREATED_WISH,
          id: newWish._id,
          newWish
        })
      } else {
        res.status(400).json({
          message: ERR_CREATE_WISH,
          errors: err.errors
        })
      }
    })

    // Push new wish into Boards wishes array
    await Board.findOneAndUpdate(
      { _id: boardId },
      { $push: { wishes: newWish._id } }
    ).populate('wishes')

    res.status(201).json(newWish)
  } catch (err) {
    res.status(400).json({
      message: ERR_CREATE_WISH,
      errors: err.errors
    })
  }
})

// Get board by ID
app.get('/boards/:boardId', async (req, res) => {
  const { boardId } = req.params

  try {
    const board = await Board.findOne({ _id: boardId })
      .populate('wishes')
    res.status(201).json(board)
  } catch (err) {
    res.status(400).json({
      message: ERR_DISPLAY_BOARD,
      errors: err.errors
    })
  }
})

// Get wish by ID
app.get('/wish/:wishId', async (req, res) => {
  const { wishId } = req.params

  try {
    const wish = await Wish.findOne({ _id: wishId })
    res.status(201).json(wish)
  } catch (err) {
    res.status(400).json({
      message: ERR_DISPLAY_WISH,
      errors: err.errors
    })
  }
})

// Delete board
app.delete('/boards/:boardId', authenticateUser)
app.delete('/boards/:boardId', async (req, res) => {
  const { boardId } = req.params

  try {
    await Board.findOneAndDelete({ _id: boardId })
    res.status(200).json({ message: DELETED_BOARD })
  } catch (err) {
    res.status(404).json({
      message: ERR_DELETE_BOARD,
      errors: err.errors
    })
  }
})

// Delete wish
app.delete('/wish/:wishId', authenticateUser)
app.delete('/wish/:wishId', async (req, res) => {
  const { wishId } = req.params

  try {
    await Wish.findOneAndDelete({ _id: wishId })
    res.status(200).json({ message: DELETED_WISH })
  } catch (err) {
    res.status(404).json({
      message: ERR_DELETE_WISH,
      errors: err.errors
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
