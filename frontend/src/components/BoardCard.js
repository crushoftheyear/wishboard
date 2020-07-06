/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faHollyBerry, faGraduationCap, faHeart, faGift } from '@fortawesome/free-solid-svg-icons'

export const BoardCard = ({ board }) => {
  const { _id, title, theme, wishes } = board

  const boardTheme = theme.toLowerCase()

  // Show icon based on theme
  const themeIcon = () => {
    switch (boardTheme) {
      case 'birthday':
        return faBirthdayCake
      case 'christmas':
        return faHollyBerry
      case 'graduation':
        return faGraduationCap
      case 'love':
        return faHeart
      default:
        return faGift
    }
  }

  return (
    <Link to={`/boards/${_id}`}>

      <Card className={`board-card theme-${boardTheme}`}>
        <div className="card-info">
          <h2>{title}</h2>
          <FontAwesomeIcon icon={themeIcon()} />
          <h4>{wishes.length} wishes</h4>
        </div>
      </Card>

    </Link>
  )
}
