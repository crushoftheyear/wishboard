import React, { useEffect } from 'react'
import { useModal } from 'hooks/useModal'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userInfo } from 'reducers/user'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { uuid } from 'uuidv4'

import { Grid } from 'components/Grid'
import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import { BoardCard } from 'components/BoardCard'
import { EmptyState } from 'components/EmptyState'

export const Profile = () => {

  const { isShowing, toggle } = useModal()
  const dispatch = useDispatch()
  const history = useHistory()

  // User data
  const accessToken = useSelector((store) => store.user.accessToken)
  const user = useSelector((store) => store.user)
  const userId = user.userId
  const boards = user.createdBoards

  useEffect(() => {
    if (accessToken) {
      dispatch(userInfo(accessToken, userId))
    } else {
      history.push('/')
    }
  }, [accessToken, userId, dispatch, history])

  return (
    <section className="profile">
      <div className="page-header">
        <h1>{user.name}</h1>

        <Button
          faIcon={faPlus}
          className="create-btn"
          submitHandler={toggle}
        />

        <Modal isShowing={isShowing} hide={toggle} display="create-board" />
      </div>

      <Grid className="boards-container">
        {boards.length > 0 ? ( // If boards exists
          boards.map((board) => (
            <BoardCard key={uuid()} board={board} />
          ))
        ) : (
            <EmptyState>
              You have not created any boards yet
            </EmptyState>
          )
        }
      </Grid>

    </section>
  )
}