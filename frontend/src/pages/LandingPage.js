import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { UserForm } from 'components/UserForm'
import { Button } from 'components/Button'

export const LandingPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  // Check if user is logged in 
  const accessToken = useSelector((store) => store.user.accessToken)

  // Redirect to Profile page
  useEffect(() => {
    if (accessToken) {
      history.push('/profile')
    }
  }, [accessToken, history, dispatch])


  return (
    <section className="landing-page">

      <h1>wishboard</h1>
      <h3>– a spot for your wishes</h3>

      <Button
        label="Demo board"
        className="btn-secondary"
        submitHandler={() => {
          history.push('/board/5f6b06f5141ea4002afc82ac')
        }}
      />

      <UserForm />


    </section>
  )
}