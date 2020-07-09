import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { CreateBoard } from './CreateBoard'
import { CreateWish } from './CreateWish'
import { ShareBoard } from './ShareBoard'

export const Modal = ({ isShowing, hide, display }) => {
  return (
    isShowing ? ReactDOM.createPortal( // Using a Portal to mount Modal component in body
      <>
        <div className="modal-overlay" />

        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className={`modal ${display}`}>
            <button type="button" id="testnos" className="close-btn" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {display === 'create-board' && <CreateBoard closeModal={hide} />}
            {display === 'create-wish' && <CreateWish closeModal={hide} />}
            {display === 'share-board' && <ShareBoard />}

          </div>
        </div>
      </>, document.body
    ) : null
  )
}