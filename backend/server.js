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
const ERR_CREATE_USER = 'Could not create user'
const ERR_LOGIN = 'Could not log in'
const ERR_LOGGED_OUT = 'Please try logging in again'
const ERR_ACCESSTOKEN = 'Accesstoken is wrong or missing'
const ERR_CREATE_BOARD = 'Could not create Board'
const ERR_ADD_WISH = 'Could not create Wish'
const ERR_DISPLAY_BOARD = 'Could not display Board'
const ERR_DISPLAY_WISH = 'Could not display Wish'

app.use(cors())
app.use(bodyParser.json())


const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header('Authorization') })
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
