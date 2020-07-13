import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createWish } from 'reducers/wish'

import { Input } from './Input'
import { Textarea } from './Textarea'
import { Select } from './Select'
import { Button } from './Button'

export const CreateWish = ({ closeModal }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [url, setUrl] = useState('')
  const [priority, setPriority] = useState('')

  const categoryOptions = [
    'Art',
    'Books',
    'Clothing',
    'Electronics',
    'Experiences',
    'Food',
    'Home',
    'Random'
  ]

  const rankingOptions = [
    1, 2, 3
  ]

  const submitHandler = () => {
    // e.preventDefault()
    dispatch(createWish(title, description, category, imgUrl, url, priority))
    closeModal()
  }

  return (
    <>
      <h2>Create wish</h2>
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          label="Title"
          state={title}
          setState={setTitle}
          required
        />
        <Textarea
          label="Description"
          state={description}
          setState={setDescription}
          maxLength="200"
        />
        <Select
          label="Category"
          id="wishCat"
          state={category}
          setState={setCategory}
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
        <Input
          type="text"
          label="Image url"
          state={imgUrl}
          setState={setImgUrl}
        />
        <Input
          type="text"
          label="External url"
          state={url}
          setState={setUrl}
        />
        <Select
          label="Ranking"
          id=""
          state={priority}
          setState={setPriority}
        >
          {rankingOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>

        <Button label="Create wish" />
      </form>
    </>
  )
}