import React, { FunctionComponent, memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../styles.scss'
import { Button } from 'react-bootstrap'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  el: any
}

const CancelGroup: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const onCancelGroup = useCallback(() => {
    const elements = html?.elements?.filter((item: any) => item?.id !== el?.id)
    const selectedElement = html?.elements?.find((item: any) => item?.id === el?.id)
    const newElements = elements?.map((item: any) => {
      if (item?.groupId === el?.id) {
        return {
          ...item,
          groupId: selectedElement.groupId,
          [device]: {
            ...item[device],
            top: selectedElement[device].top + item[device].top,
            left: selectedElement[device].left + item[device].left,
          },
        }
      }

      return item
    })
    dispatch(actionSaveHTML({
      ...html,
      elements: newElements,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        elements: newElements,
      },
    ]))
  }, [dispatch, device, el, html, history])

  return (
    <Button variant="outline-primary" className="border-0" onClick={() => onCancelGroup()}>
      <span className="fontSize--10 p--5 whiteSpace--nowrap">HỦY NHÓM</span>
    </Button>
  )
}

export default memo(CancelGroup)
