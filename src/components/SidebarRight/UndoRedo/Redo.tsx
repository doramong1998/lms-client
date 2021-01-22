import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import { actionSaveHistoryIndex, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {}

const Redo: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const historyIndex = useSelector((state: ApplicationState) => state.builder.historyIndex)
  const redo = () => {
    if (historyIndex < history.length - 1) {
      dispatch(actionSaveHistoryIndex(historyIndex + 1))
      dispatch(actionSaveHTML(history[historyIndex + 1]))
    }
  }
  return (
    <Button variant="outline-primary" onClick={redo}>
      <i className="hi-icon icon-redo" />
      {' '}
      Redo (Ctrl + Shift + Z)
    </Button>
  )
}

export default Redo
