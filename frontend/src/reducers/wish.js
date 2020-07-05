import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wishId: 0,
  errorMessage: null,
  title: null,
  description: null,
  category: null,
  imgUrl: null,
  url: null,
  rank: 0,
  boardParent: null,
  createdBy: null
}

export const wish = createSlice({
  name: 'wish',
  initialState,
  reducers: {
    setWishId: (state, action) => {
      const { wishId } = action.payload
      state.wishId = wishId
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      state.errorMessage = errorMessage
    },
    setTitle: (state, action) => {
      const { title } = action.payload
      state.title = title
    },
    setDescription: (state, action) => {
      const { description } = action.payload
      state.description = description
    },
    setCategory: (state, action) => {
      const { category } = action.payload
      state.category = category
    },
    setImgUrl: (state, action) => {
      const { imgUrl } = action.payload
      state.imgUrl = imgUrl
    },
    setUrl: (state, action) => {
      const { url } = action.payload
      state.url = url
    },
    setRank: (state, action) => {
      const { rank } = action.payload
      state.rank = rank
    },
    setBoardParent: (state, action) => {
      const { boardParent } = action.payload
      state.boardParent = boardParent
    },
    setCreatedBy: (state, action) => {
      const { createdBy } = action.payload
      state.createdBy = createdBy
    },
    clearState: () => {
      return initialState
    }
  }
})

// Thunks
const BASE_URL = 'http://localhost:8080'

// Create new wish
export const createWish = (
  title,
  description,
  category,
  imgUrl,
  url,
  rank
) => {

  return (dispatch, getState) => {
    const { accessToken } = getState().user
    const { boardId } = getState().board

    const WISH_URL = `${BASE_URL}/users/${userId}/boards/${boardId}`

    fetch(WISH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({
        title,
        description,
        category,
        imgUrl,
        url,
        rank
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not create wish, please try again.')
      })
      .then((json) => {
        dispatch(wish.actions.setTitle({ title: json.title }))
        dispatch(wish.actions.setDescription({ description: json.description }))
        dispatch(wish.actions.setCategory({ category: json.category }))
        dispatch(wish.actions.setImgUrl({ imgUrl: json.imgUrl }))
        dispatch(wish.actions.setUrl({ url: json.url }))
        dispatch(wish.actions.setRank({ rank: json.rank }))
      })
      .catch((err) => {
        dispatch(wish.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

// Get wish by ID
export const wishInfo = (wishId) => {
  const WISH_URL = `${BASE_URL}/wish/${wishId}`

  return (dispatch) => {
    fetch(WISH_URL, {
      method: 'GET'
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Could not get wish.')
      })
      .then((json) => {
        dispatch(wish.actions.setWishId({ wishId: json._id }))
        dispatch(wish.actions.setTitle({ title: json.title }))
        dispatch(wish.actions.setDescription({ description: json.description }))
        dispatch(wish.actions.setCategory({ category: json.category }))
        dispatch(wish.actions.setImgUrl({ imgUrl: json.imgUrl }))
        dispatch(wish.actions.setUrl({ url: json.url }))
        dispatch(wish.actions.setRank({ rank: json.rank }))
        dispatch(wish.actions.setBoardParent({ boardParent: json.boardParent }))
        dispatch(wish.actions.setCreatedBy({ createdBy: json.createdBy }))
      })
      .catch((err) => {
        dispatch(wish.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

// Delete wish