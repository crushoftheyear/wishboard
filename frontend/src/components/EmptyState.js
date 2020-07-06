import React from 'react'
import { LottieControl } from 'components/LottieControl'
import animation from '../img/lottie/18332-create-a-shot-list copy.json'

export const EmptyState = ({ children }) => {
  return (
    <section className="empty-state">

      <LottieControl
        animation={animation}
        width="50%"
      />

      <h2>{children}</h2>

    </section>

  )
}