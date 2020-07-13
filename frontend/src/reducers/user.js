import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: null,
  userId: 0,
  errorMessage: null,
  name: null,
  createdBoards: []
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload
      state.accessToken = accessToken
    },
    setUserId: (state, action) => {
      const { userId } = action.payload
      state.userId = userId
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      state.errorMessage = errorMessage
    },
    setName: (state, action) => {
      const { name } = action.payload
      state.name = name
    },
    setCreatedBoards: (state, action) => {
      const { createdBoards } = action.payload
      state.createdBoards = createdBoards
    },
    logout: () => {
      return initialState
    }
  }
})

// Thunks
const BASE_URL = 'https://wishboard-backend.herokuapp.com'

// Sign up
export const signup = (name, email, password) => {
  const SIGNUP_URL = `${BASE_URL}/users`

  return (dispatch) => {
    fetch(SIGNUP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Unable to create user. Please try again.')
      })
      .then((json) => {
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }))
        dispatch(user.actions.setUserId({ userId: json.id }))
        dispatch(user.actions.setName({ name: json.name }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

// Log in
export const login = (email, password) => {
  const LOGIN_URL = `${BASE_URL}/sessions`

  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Unable to log in. Please check your email and password.')
      })
      .then((json) => {
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }))
        dispatch(user.actions.setUserId({ userId: json._id }))
        dispatch(user.actions.setName({ name: json.name }))
        dispatch(user.actions.setErrorMessage({ errorMessage: '' }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

// Get user info
export const userInfo = (accessToken, userId) => {
  const USER_URL = `${BASE_URL}/users/${userId}`

  return (dispatch) => {
    fetch(USER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not get user information. Make sure you are logged in and try again.')
      })
      .then((json) => {
        dispatch(user.actions.setCreatedBoards({ createdBoards: json.createdBoards }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

/*
// Log out
export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.clearState())
    dispatch(boards.actions.clearState())
    dispatch(wishes.actions.clearState())
    window.localStorage.clear()
  }
}
*/