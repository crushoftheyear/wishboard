import React from 'react'

export const Grid = ({ children, className }) => {
  return (
    <div className={`grid ${className}`}>
      {children}
    </div>
  )
}
