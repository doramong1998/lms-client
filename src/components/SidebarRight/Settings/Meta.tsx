import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'

export interface Props {
  openModal: () => void
}

const Meta: FunctionComponent<Props> = ({ openModal }) => {
  const handleModal = () => {
    openModal()
  }

  return (
    <Button variant="outline-primary" onClick={handleModal}>
      <i className="hi-icon icon-logo-facebook" />
      {' '}
      SEO & SOCIAL
    </Button>
  )
}

export default Meta
