import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import { ui } from 'reducers/ui'
import { user } from 'reducers/user'
import { board } from 'reducers/board'
import { wish } from 'reducers/wish'

import { saveState, loadState } from 'utils/localStorage'

import { Wrapper } from 'components/Wrapper'
import { LandingPage } from 'pages/LandingPage'
import { Profile } from 'pages/Profile'
import { Board } from 'pages/Board'
import { Wish } from 'pages/Wish'

import 'normalize.css'
import 'scss/app.scss'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
  ui: ui.reducer,
  user: user.reducer,
  board: board.reducer,
  wish: wish.reducer
})

const persistedState = loadState()

const store = createStore(
  reducer,
  persistedState,
  composeEnhancer(applyMiddleware(thunk))
)

// Will be invoked on any state change –– pass the current state of the store to saveState function
store.subscribe(() => saveState(store.getState()))

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Wrapper>
          <Switch>

            <Route path="/" exact>
              <LandingPage />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/board/:boardId">
              <Board />
            </Route>

            <Route path="/wish/:wishId">
              <Wish />
            </Route>

          </Switch>
        </Wrapper>
      </BrowserRouter>
    </Provider>
  )
}
