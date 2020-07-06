import React from 'react'
import { uuid } from 'uuidv4'

export const Input = ({
  type,
  label,
  placeholder,
  state,
  setState,
  required,
  minLength,
  maxLength }) => {

  const id = uuid()

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder={placeholder}
        required={required && 'required'}
        minLength={minLength}
        maxLength={maxLength} />
    </>
  )
}