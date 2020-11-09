import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './tailwind.output.css'
import GlobalStyle from './lib/globalStyles';
import { App } from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
)