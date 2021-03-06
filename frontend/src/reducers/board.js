import { createSlice } from '@reduxjs/toolkit'
import { user } from './user'
import { ui } from './ui'

const initialState = {
  boardId: 0,
  errorMessage: null,
  title: null,
  theme: null,
  wishes: [],
  createdBy: null
}

export const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardId: (state, action) => {
      const { boardId } = action.payload
      state.boardId = boardId
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      state.errorMessage = errorMessage
    },
    setTitle: (state, action) => {
      const { title } = action.payload
      state.title = title
    },
    setTheme: (state, action) => {
      const { theme } = action.payload
      state.theme = theme
    },
    setWishes: (state, action) => {
      const { wishes } = action.payload
      state.wishes = wishes
    },
    setCreatedBy: (state, action) => {
      const { createdBy } = action.payload
      state.createdBy = createdBy
    },
    addWish: (state, action) => {
      const { newWish } = action.payload
      state.wishes.push(newWish)
    },
    clearState: () => {
      return initialState
    }
  }
})

// Thunks
const BASE_URL = 'https://wishboard-backend.herokuapp.com'

// Create new board
export const createBoard = (title, theme) => {

  return (dispatch, getState) => {
    const { accessToken, userId } = getState().user
    const BOARD_URL = `${BASE_URL}/users/${userId}/boards`

    fetch(BOARD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ title, theme })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not create board, please try again.')
      })
      .then((json) => {
        dispatch(board.actions.setTitle({ title: json.title }))
        dispatch(board.actions.setTheme({ theme: json.theme }))
        dispatch(user.actions.addBoard({ newBoard: json.newBoard }))
      })
      .catch((err) => {
        dispatch(board.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

// Get board by ID
export const boardInfo = (boardId) => {
  const BOARD_URL = `${BASE_URL}/boards/${boardId}`

  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    fetch(BOARD_URL, {
      method: 'GET'
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not get board.')
      })
      .then((json) => {
        dispatch(board.actions.setBoardId({ boardId: json._id }))
        dispatch(board.actions.setTitle({ title: json.title }))
        dispatch(board.actions.setTheme({ theme: json.theme }))
        dispatch(board.actions.setWishes({ wishes: json.wishes }))
        dispatch(board.actions.setCreatedBy({ createdBy: json.createdBy }))
        dispatch(ui.actions.setLoading(false))
      })
      .catch((err) => {
        dispatch(board.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

// Delete board –– ! WIP
export const deleteBoard = (userId, boardId) => {
  const DELETE_BOARD_URL = `${BASE_URL}/users/${userId}/boards/${boardId}`

  return (dispatch, getState) => {
    const { accessToken } = getState().user

    fetch(DELETE_BOARD_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not delete board.')
      })
      .then((json) => {
        // TODO: Delete action in slice & dispatch here
      })
      .catch((err) => {
        dispatch(board.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}