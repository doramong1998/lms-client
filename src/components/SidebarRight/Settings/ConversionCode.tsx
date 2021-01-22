import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'

export interface Props {
  openModal: () => void
}

const ConversionCode: FunctionComponent<Props> = ({ openModal }) => {
  const handleModal = () => {
    openModal()
  }

  return (
    <Button variant="outline-primary" onClick={handleModal}>
      <i className="hi-icon icon-html" />
      {' '}
      Mã chuyển đổi
    </Button>
  )
}

export default ConversionCode
