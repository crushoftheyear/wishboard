import React from 'react';

export const Emoji = ({ label, symbol }) => {
  return (
    <span
      role="img"
      aria-label={label}
    >
      {symbol}
    </span>
  )

}