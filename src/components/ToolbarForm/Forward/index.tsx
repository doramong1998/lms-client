import React, { FunctionComponent, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedId: string
}

const Forward: FunctionComponent<Props> = ({ selectedId }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const onChangeElement = () => {
    let maxIndex = 0
    for (const item of html?.formItem) {
      if (item.zIndex > maxIndex) {
        maxIndex = item.zIndex
      }
    }
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          zIndex: maxIndex + 1,
        }
      }
      return item
    })
    dispatch(actionSaveHTML({
      ...html,
      formItem,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        formItem,
      },
    ]))
  }

  return <i className="hi-icon icon-forward" onClick={() => onChangeElement()} />
}

export default memo(Forward)
