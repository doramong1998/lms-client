import React, { FunctionComponent, memo } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import uid from 'uid'
import { actionCropElement } from '../../../store/event/actions'

export interface Props {
}

const Crop: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id={uid(10)}>Cắt ảnh</Tooltip>}
    >
      <Button variant="outline-primary" className="border-0" onClick={() => dispatch(actionCropElement(true))}>
        <i className="hi-icon icon-crop" />
      </Button>
    </OverlayTrigger>
  )
}

export default memo(Crop)
