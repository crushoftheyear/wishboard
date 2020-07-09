import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { UserForm } from 'components/UserForm'

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
      <h3>~ a place for your wishes</h3>

      <UserForm />

    </section>
  )
}