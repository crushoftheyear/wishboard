import React from 'react'
import styled from 'styled-components/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PrimaryButton = styled.button`
  border: 0;
  height: 40px;
  background-color: #e6c345;
  padding: .6rem 1.2rem;
  font-family: 'BrandonBold';
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
    <PrimaryButton
      type="submit"
      onClick={submitHandler}
      className={`${className} rounded-2xl`}
    >

      { faIcon && <FontAwesomeIcon icon={faIcon} />}
      { label}

    </PrimaryButton>
  )
}