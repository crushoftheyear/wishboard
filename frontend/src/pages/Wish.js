import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { wishInfo } from 'reducers/wish'
import placeholder from 'img/wish_placeholder.png'
import { faArrowLeft, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

import { Button } from 'components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Wish = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { wishId } = useParams()

  useEffect(() => {
    // dispatch(wish.actions.clearState())
    dispatch(wishInfo(wishId))
  }, [wishId, dispatch])

  // const isLoading = useSelector((store) => store.ui.isLoading)
  const wish = useSelector((store) => store.wish)
  const { title, description, category, imgUrl, url, priority } = wish
  const currentBoard = useSelector((store) => store.board.boardId)
  // const errorMessage = useSelector((store) => store.wish.errorMessage)

  // Checking if url contains http:// (and adds it)
  const checkUrl = (extUrl) => {
    if (!extUrl.match(/^https?:\/\//i)) {
      extUrl = `http://${extUrl}`
    }
    return extUrl
  }

  // Removing http:// and www + shorten url
  const shortenUrl = (extUrl) => {
    return extUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
  }

  return (
    <section className="wish">
      <Button
        faIcon={faArrowLeft}
        className="back-btn"
        submitHandler={() => {
          // dispatch(wish.actions.clearState())
          history.push(`/boards/${currentBoard}`)
        }}
      />

      {/* {!isLoading && ( */}
      <div className="wish-container">

        <div className="img-container wish-img">
          <div className="ratio" />
          <img
            src={imgUrl || placeholder}
            alt={title}
          />
        </div>

        <div className="wish-desc">
          <div className="wish-desc-header">
            <span>{category}</span>
            <span>{priority}</span>
          </div>

          <h1>{title}</h1>
          <p>{description}</p>

          {url && (
            <a href={checkUrl(url)} target="_blank" rel="noopener noreferrer">
              {shortenUrl(url)}
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          )}

        </div>

      </div>
      {/* )} */}

      {/* {errorMessage && <h2 className="error-message">{`${errorMessage}`}</h2>} */}

    </section>
  )
}
