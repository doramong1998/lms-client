import React, { FunctionComponent, memo, useCallback } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  el: any
}

const Lock: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const onLock = useCallback(() => {
    const selectedElement = html?.elements?.find((item: any) => item?.id === el?.id)
    if (selectedElement?.type !== 'group') {
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === el?.id) {
          return {
            ...item,
            lock: !item?.lock,
          }
        }
        return item
      })
      dispatch(actionSaveHTML({
        ...html,
        elements,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements,
        },
      ]))
    } else {
      const elements = html?.elements?.map((item: any) => {
        if (el?.element?.includes(item?.id) || item?.id === el?.id) {
          return {
            ...item,
            lock: !item?.lock,
          }
        }
        return item
      })
      dispatch(actionSaveHTML({
        ...html,
        elements,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements,
        },
      ]))
    }
  }, [dispatch, html, el, history])

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={uid(10)}>{el?.lock ? 'Mở phần tử' : 'Khóa phần tử'}</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onLock()}>
        <i className={`hi-icon icon-${el?.lock ? 'unlocked' : 'lock'}`} />
      </Button>
    </OverlayTrigger>
  )
}

export default memo(Lock)
