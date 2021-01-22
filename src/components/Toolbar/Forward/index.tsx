import React, { FunctionComponent, memo, useCallback } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import uid from 'uid'
import { ApplicationState } from '../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../store/builder/actions'

export interface Props {
  el: any
}

const Forward: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)

  const onForward = useCallback(() => {
    let maxIndex = 0
    for (const item of html?.elements) {
      if (item.zIndex > maxIndex) {
        maxIndex = item.zIndex
      }
    }
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === el?.id) {
        return {
          ...item,
          zIndex: maxIndex + 1,
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
  }, [dispatch, html, el, history])

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={uid(10)}>Lên trên (Ctrl + &#x21E7;)</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onForward()}>
        <i className="hi-icon icon-forward" />
      </Button>
    </OverlayTrigger>
  )
}

export default memo(Forward)
