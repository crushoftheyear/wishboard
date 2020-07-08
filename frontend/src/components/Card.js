import React from 'react'

export const Card = ({ children, className, clickHandler }) => {
  return (
    <article className={`card ${className}`} onClick={clickHandler}>
      {children}
    </article>
  )
}