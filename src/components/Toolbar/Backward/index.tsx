import React, { FunctionComponent, memo, useCallback } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  el: any
}

const Backward: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const onBackward = useCallback(() => {
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === el?.id) {
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
      elements,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        elements,
      },
    ]))
  }, [dispatch, html, el, history])

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={uid(10)}>Xuống dưới (CTRL + &#x21E9;)</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onBackward()}>
        <i className="hi-icon icon-backward" />
      </Button>
    </OverlayTrigger>
  )
}

export default memo(Backward)
