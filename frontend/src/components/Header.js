import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { user } from 'reducers/user'
import { ui } from 'reducers/ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'

import { Button } from './Button'

export const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  // const loggedInUser = useSelector((store) => store.user)
  const userForm = useSelector((store) => store.ui.loginForm)
  // const loggedIn = useSelector((store) => store.user.loggedIn)

  // Check if user is logged in
  const accessToken = useSelector((store) => store.user.accessToken)
  const isLoggedIn = accessToken !== null
  console.log('LOGGED IN: ' + isLoggedIn)

  // DEV
  const loggedIn = false

  // Toggle login/signup form
  const toggleForm = () => {
    dispatch(ui.actions.setLoginForm({ loginForm: !userForm }))
    // Clear error message
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
  }

  return (
    <header>
      <div className="container">

        <div className="logo">
          <Link to="/">
            <FontAwesomeIcon icon={faGift} />
          </Link>
        </div>

        {!loggedIn && (
          <Button
            label={userForm ? 'Sign up' : 'Log in'}
            className="toggle-form-btn"
            submitHandler={() => {
              toggleForm()
              // history.push('/')
            }}
          />
        )}

        {loggedIn && (
          <>
            {/* <Button
              label={loggedInUser.name.charAt(0).toUpperCase()}
              className="home-btn"
              submitHandler={() => { history.push('/') }}
            /> */}

            <Button
              label="Log out"
              className="logout-btn"
              submitHandler={() => {
                dispatch(user.actions.logout())
                history.push('/')
              }}
            />

          </>
        )}
      </div>
    </header>
  )
}