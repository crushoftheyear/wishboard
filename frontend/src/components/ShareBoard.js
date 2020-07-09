import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { Button } from './Button'

export const ShareBoard = () => {
  const board = useSelector((store) => store.boards.board)
  const url = `https://wishboard-backend.herokuapp.com/boards/${board.boardId}`
  const link = useRef(null)
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    link.current.select()
    document.execCommand('copy')
    setCopySuccess(true)
  }

  return (
    <>
      <h2>Share board</h2>

      <div className="container">
        <textarea ref={link} defaultValue={url} />
        <Button
          faIcon={faClipboard}
          className={`copy-btn ${copySuccess ? 'copy-success' : ''}`}
          submitHandler={copyToClipboard}
        />
        {copySuccess && <span className="copy-success">Copied to clipboard!</span>}
      </div>

    </>
  )
}
