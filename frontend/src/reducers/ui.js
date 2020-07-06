import { createSlice } from '@reduxjs/toolkit'

export const ui = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    loginForm: true
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setLoginForm: (state, action) => {
      const { loginForm } = action.payload
      state.loginForm = loginForm
    }
  }
})