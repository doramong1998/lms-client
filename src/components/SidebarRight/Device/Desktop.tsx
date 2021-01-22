import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { actionHandleDevice } from '../../../store/sidebarRight/actions'

export interface Props {}

const Desktop: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const setDesktop = () => {
    dispatch(actionHandleDevice('desktop'))
  }
  return (
    <Button variant="outline-primary" onClick={setDesktop} className="py-2">
      <i className="hi-icon icon-pc" />
      <br />
      Desktop
    </Button>
  )
}

export default Desktop
