import React from 'react'
import { useSelector } from 'react-redux'
import { Emoji } from './Emoji'

export const Loading = ({ loading }) => {

  const isLoading = useSelector((state) => state.ui.isLoading)

  return (
    <>
      {isLoading &&
        <section className="loading-container">

          <div className="loader">
            <Emoji label="Thought balloon" symbol="💭" />
            <Emoji label="Thought balloon" symbol="💭" />
            <Emoji label="Thought balloon" symbol="💭" />
          </div>

          <h4>Loading wishes...</h4>

        </section>
      }
    </>
  )
}