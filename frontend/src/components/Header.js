import React from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'

import { user } from 'reducers/user'
import { ui } from 'reducers/ui'

import { Button } from './Button'

const PageHeader = styled.header`
  background-color: #50aca2;
  color: #103a35;
  height: 80px;
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 1rem;
`

const Logo = styled.div`
  flex: 1 1 auto;
  font-size: 2rem;

  svg {
    cursor: pointer;
  }
`

export const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  // Check if user is logged in
  const accessToken = useSelector((store) => store.user.accessToken)

  // Toggle login/signup form
  const userForm = useSelector((store) => store.ui.loginForm)

  const toggleForm = () => {
    dispatch(ui.actions.setLoginForm({ loginForm: !userForm }))
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
  }

  const homeBtn = () => {
    if (accessToken) {
      history.push('/profile')
    } else {
      history.push('/')
    }
  }

  return (
    <PageHeader>
      <Container>

        <Logo onClick={() => homeBtn()}>
          <FontAwesomeIcon icon={faGift} />
        </Logo>

        {!accessToken ? (
          <Button
            label={userForm ? 'Sign up' : 'Log in'}
            className="toggle-form-btn"
            submitHandler={() => {
              toggleForm()
              history.push('/')
            }}
          />
        ) : (
            <Button
              label="Log out"
              className="logout-btn"
              submitHandler={() => {
                dispatch(user.actions.logout())
                history.push('/')
              }}
            />
          )}
      </Container>
    </PageHeader>
  )
}