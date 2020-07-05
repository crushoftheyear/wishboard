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
    clearState: () => {
      return initialState
    }
  }
})

// Thunks
const baseUrl = 'http://localhost:8080'

