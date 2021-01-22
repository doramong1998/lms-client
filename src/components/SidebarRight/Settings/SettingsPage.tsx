import React, { FunctionComponent } from 'react'
import { Button } from 'react-bootstrap'

export interface Props {
  openModal: () => void
}

const ConversionCode: FunctionComponent<Props> = ({ openModal }) => (
  <Button variant="outline-primary" onClick={() => openModal()}>
    <i className="hi-icon icon-page-setting" />
    {' '}
    Thiết lập toàn trang
  </Button>
)

export default ConversionCode
