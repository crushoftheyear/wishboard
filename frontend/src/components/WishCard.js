import React from 'react'
import { Link } from 'react-router-dom'

import { Card } from 'components/Card'
import placeholder from 'img/wish_placeholder.png'

export const WishCard = ({ wish }) => {
  const { _id, title, category, imgUrl } = wish

  return (
    <Link to={`/wish/${_id}`}>

      <Card className="wish-card">
        <div className="img-container">
          <div className="ratio" />

          <img
            src={imgUrl || placeholder}
            alt={title}
          />

        </div>
        <div className="card-info">
          <h2>{title}</h2>
          <p>{category}</p>
        </div>
      </Card>

    </Link>
  )
}
