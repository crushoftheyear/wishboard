import React from 'react'

export const Card = ({ children, className }) => {
  return (
    <article className={`card ${className}`}>
      {children}
    </article>
  )
}