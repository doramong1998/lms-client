import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export interface Props { }

const ComeBack: FunctionComponent<Props> = () => {
  const history = useHistory()

  return (
    <Button variant="outline-primary" className="py-2" onClick={() => history.goBack()}>
      <i className="hi-icon icon-back-arrow" />
      <br />
      <span>Quay lại</span>
    </Button>
  )
}

export default ComeBack
