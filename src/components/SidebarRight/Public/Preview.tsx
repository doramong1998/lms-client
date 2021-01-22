import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export interface Props { }

const Preview: FunctionComponent<Props> = () => {
  const history = useHistory()

  return (
    <Button variant="outline-primary" onClick={() => history.push('/preview')}>
      <i className="hi-icon icon-preview" />
      {' '}
      Xem trước
    </Button>
  )
}

export default Preview
