import React, { FunctionComponent, memo, useCallback } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import uid from 'uid'
import { actionCopyElement } from '../../../store/toolbar/actions'

export interface Props {
  el: any
}

const Copy: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const onCopy = useCallback(() => {
    dispatch(actionCopyElement(el?.id))
  }, [dispatch, el])

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={uid(10)}>Sao chép (Ctrl + C)</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => onCopy()}>
        <i className="hi-icon icon-copy" />
      </Button>
    </OverlayTrigger>
  )
}

export default memo(Copy)
