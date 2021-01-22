import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import { actionSaveHistoryIndex, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {}

const Undo: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const historyIndex = useSelector((state: ApplicationState) => state.builder.historyIndex)
  const undo = () => {
    if (historyIndex > 0) {
      dispatch(actionSaveHistoryIndex(historyIndex - 1))
      dispatch(actionSaveHTML(history[historyIndex - 1]))
    }
  }
  return (
    <Button variant="outline-primary" onClick={undo}>
      <i className="hi-icon icon-undo" />
      {' '}
      Undo (Ctrl + Z)
    </Button>
  )
}

export default Undo
