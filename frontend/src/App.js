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
// import { Header } from 'components/Header'
// import { Main } from 'components/Main'
// import { Home } from 'pages/Home'
// import { Board } from 'pages/Board'
// import { Wish } from 'pages/Wish'
// import { PageNotFound } from 'pages/PageNotFound'

// import 'normalize.css'
// import 'scss/app.scss'

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
        <Header />
        <Main>
          <Switch>

            <Route path="/" component={Home} exact />
            <Route path="/boards/:id" component={Board} exact />
            <Route path="/wish/:id" component={Wish} exact />
            <Route path="*" component={PageNotFound} />

          </Switch>
        </Main>
      </BrowserRouter>
    </Provider>
  )
}
