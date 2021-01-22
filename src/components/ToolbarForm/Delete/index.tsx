import React, { FunctionComponent, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML, actionSelectId } from '../../../store/builder/actions'

export interface Props {
  selectedId: string
}

const Delete: FunctionComponent<Props> = ({ selectedId }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const onChangeElement = () => {
    const newElements = [...html?.formItem]
    for (const item in newElements) {
      if (newElements[item].id === selectedId) {
        newElements.splice(parseInt(item, 10), 1)
      }
    }
    dispatch(actionSaveHTML({
      ...html,
      formItem: newElements,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        formItem: newElements,
      },
    ]))
    dispatch(actionSelectId(''))
  }

  return <i className="hi-icon icon-bin" onClick={() => onChangeElement()} />
}

export default memo(Delete)
