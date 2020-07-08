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

export const Board = () => {
  const { isShowing, toggle } = useModal()
  const [modalDisplay, setModalDisplay] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  // const isLoading = useSelector((store) => store.ui.isLoading)
  // const errorMessage = useSelector((store) => store.boards.board.errorMessage)

  const { boardId } = useParams()

  useEffect(() => {
    dispatch(boardInfo(boardId))
    // console.log('useEffect!')
  }, [boardId, dispatch])


  const usersBoards = useSelector((store) => store.user.createdBoards)

  // Check if user is the boardCreator
  const boardCreatorAccess = () => {
    const checkId = (board) => board._id === boardId
    return usersBoards.some(checkId)
  }

  const board = useSelector((store) => store.board)
  const wishesExists = board.wishes.length > 0

  return (
    <section className="board">

      {boardCreatorAccess() && (
        <div className="page-header">
          <Button
            faIcon={faArrowLeft}
            className="back-btn"
            submitHandler={() => {
              // dispatch(board.actions.clearState())
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
        <h1>{board.title}</h1>

        <Grid className="wishes-container">

          {!wishesExists && (
            <EmptyState>
              {boardCreatorAccess() ? 'Start adding wishes to your board!' : 'This board does not contain any wishes yet.'}
            </EmptyState>
          )}

          {board.wishes.map((wish) => (
            <WishCard key={uuid()} wish={wish} />
          ))}

        </Grid>
      </>

      {/* {errorMessage && <h2 className="error-message">{`${errorMessage}`}</h2>} */}

    </section>
  )
}
