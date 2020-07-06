import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup, login } from 'reducers/user'

import { Input } from './Input'
import { Button } from './Button'

export const UserForm = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Login
  const handleLogin = (e) => {
    e.preventDefault()
    setPassword('')
    dispatch(login(email, password))
  }

  // Sign up
  const handleSignup = (e) => {
    e.preventDefault()
    dispatch(signup(name, email, password))
    setPassword('')
  }

  // Get state of which form is currently displayed
  const loginForm = useSelector((store) => store.ui.loginForm)

  return (
    <section className="user-form">

      <form onSubmit={loginForm ? handleLogin : handleSignup}>

        {!loginForm && (
          <Input
            type="text"
            label="Name"
            state={name}
            setState={setName}
            required
            maxLength={25}
          />
        )}

        <Input
          type="email"
          label="Email"
          state={email}
          setState={setEmail}
          required
          maxLength={50}
        />

        <Input
          type="password"
          label="Password"
          state={password}
          setState={setPassword}
          required
          minLength={4}
          maxLength={20}
        />

        {loginForm ? (
          <Button
            label="Log in"
          />
        ) : (
            <Button
              label="Sign up"
            />
          )}

      </form>
    </section>
  )
}
