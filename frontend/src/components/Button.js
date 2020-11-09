import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Btn = styled.button`
  border: 0;
  height: 40px;
  // border-radius: $borderRadiusXSmall;
  // background-color: $colorSecondary;
  padding: .6rem 1.2rem;
  font-family: 'brandon_grotesquebold';
  font-weight: inherit;
  transition: all .15s ease-in-out;
  cursor: pointer;

  // &:hover {
  //   background-color: darken($colorSecondary, 15%);
  // }

  // &:focus {
  //   @extend .input-focus;
  // }
`

export const Button = ({ label, faIcon, className, submitHandler }) => {
  return (
    <Btn
      type="submit"
      onClick={submitHandler}
      className={className}
    >

      {faIcon && <FontAwesomeIcon icon={faIcon} />}
      {label}

    </Btn>
  )
}