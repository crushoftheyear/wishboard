import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Button = ({ label, faIcon, className, submitHandler }) => {
  return (
    <button
      type="submit"
      onClick={submitHandler}
      className={className}
    >

      {faIcon && <FontAwesomeIcon icon={faIcon} />}
      {label}

    </button>
  )
}