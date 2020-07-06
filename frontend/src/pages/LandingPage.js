import React from 'react'
import { UserForm } from 'components/UserForm'

export const LandingPage = () => {
  return (
    <section className="landing-page">

      <h1>wishboard</h1>
      <h3>~ a place for your wishes</h3>

      <UserForm />

    </section>
  )
}