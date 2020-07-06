import React from 'react'
import { Header } from './Header'

export const Wrapper = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />

      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  )
}
