import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBoard } from 'reducers/board'

import { Input } from './Input'
import { Select } from './Select'
import { Button } from './Button'

export const CreateBoard = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [theme, setTheme] = useState('')

  const themeOptions = [
    'Birthday',
    'Christmas',
    'Graduation',
    'Love',
    'Random'
  ]

  const submitHandler = () => {
    dispatch(createBoard(title, theme))
  }

  return (
    <>
      <h2>Create board</h2>
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          label="Title"
          state={title}
          setState={setTitle}
          required
        />
        <Select
          label="Theme"
          state={theme}
          setState={setTheme}
        >
          {themeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
        <Button
          label="Create board"
        />
      </form>
    </>
  )
}