import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'

export interface Props {
  openModal: () => void
}

const JsCssCode: FunctionComponent<Props> = ({ openModal }) => {
  const handleModal = () => {
    openModal()
  }

  return (
    <Button variant="outline-primary" onClick={handleModal}>
      <i className="hi-icon icon-html" />
      {' '}
      Mã Javascript/CSS
    </Button>
  )
}

export default JsCssCode
