import React from 'react'
import { uuid } from 'uuidv4'

export const Select = ({ children, label, state, setState }) => {
  const id = uuid()

  return (
    <>
      <label htmlFor={id}>{label}</label>

      <div className="dropdown">
        <select
          onChange={e => setState(e.target.value)}
          id={id}
          value={state}
          required
        >
          <option value="" disabled>Select</option>
          {children}

        </select>
      </div>

    </>
  )
}