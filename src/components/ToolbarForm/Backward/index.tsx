import React, { FunctionComponent, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  selectedId: string
}

const Backward: FunctionComponent<Props> = ({ selectedId }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const onChangeElement = () => {
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          zIndex: 1,
        }
      }
      return {
        ...item,
        zIndex: item.zIndex + 1,
      }
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

  return <i className="hi-icon icon-backward" onClick={() => onChangeElement()} />
}

export default memo(Backward)
