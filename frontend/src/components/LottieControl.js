import React from 'react'
import Lottie from 'react-lottie'

export const LottieControl = ({ animation, width }) => {
  return (
    <Lottie
      options={{ animationData: animation }}
      width={width}
    />
  )
}
