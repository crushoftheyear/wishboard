import React, { useEffect, useState } from 'react'
import { useModal } from 'hooks/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { boardInfo } from 'reducers/board'
import { useParams, useHistory } from 'react-router-dom'
import { uuid } from 'uuidv4'
import { faArrowLeft, faPlus, faShare } from '@fortawesome/free-solid-svg-icons'

import { Button } from 'components/Button'
import { Grid } from 'components/Grid'
import { WishCard } from 'components/WishCard'
import { Modal } from 'components/Modal'
import { EmptyState } from 'components/EmptyState'
import { Loading } from 'components/Loading'

export const Board = () => {
  const { isShowing, toggle } = useModal()
  const [modalDisplay, setModalDisplay] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const { boardId } = useParams()
  const isLoading = useSelector((state) => state.ui.isLoading)

  useEffect(() => {
    dispatch(boardInfo(boardId))
  }, [boardId, dispatch])

  const currentBoard = useSelector((store) => store.board)
  const { title, wishes, createdBy } = currentBoard

  // Check if board is created by user
  const userId = useSelector((store) => store.user.userId)
  const boardCreatorAccess = () => { return userId === createdBy }

  const wishesExists = wishes.length > 0

  return (
    <>
      <Loading />

      <section className="board">

        {boardCreatorAccess() && (
          <div className="page-header">
            <Button
              faIcon={faArrowLeft}
              className="back-btn"
              submitHandler={() => {
                history.push('/profile')
              }}
            />

            <Button
              faIcon={faPlus}
              className="create-btn"
              submitHandler={() => {
                setModalDisplay('create-wish')
                toggle()
              }}
            />

            <Button
              faIcon={faShare}
              className="share-btn"
              submitHandler={() => {
                setModalDisplay('share-board')
                toggle()
              }}
            />

            <Modal isShowing={isShowing} hide={toggle} display={modalDisplay} />

          </div>
        )}

        <>
          <h1>{title}</h1>

          <Grid className="wishes-container">

            {(!wishesExists && !isLoading) && (
              <EmptyState>
                {boardCreatorAccess() ? 'Start adding wishes to your board!' : 'This board does not contain any wishes yet.'}
              </EmptyState>
            )}

            {wishes.map((wish) => (
              <WishCard key={uuid()} wish={wish} />
            ))}

          </Grid>
        </>

      </section>
    </>
  )
}
