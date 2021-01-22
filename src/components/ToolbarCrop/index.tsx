import React, { FunctionComponent, memo } from 'react'
import {
  ButtonGroup, Button, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { css } from 'emotion'
import { useDispatch } from 'react-redux'
import { actionCropElement } from '../../store/event/actions'

export interface Props {
  top?: any,
  left?: any,
}

const ToolbarCrop: FunctionComponent<Props> = ({
  top, left,
}) => {
  const dispatch = useDispatch()
  const stylesElement = css`
    top: ${top - 45}px;
    left: ${left}px;
  `

  return (
    <ButtonGroup size="sm" className={`toolbar ${stylesElement}`}>
      <div className="toolbar__item">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="cropRefresh">Sắp xếp lại</Tooltip>}
        >
          <Button variant="outline-primary" className="border-0">
            <i className="hi-icon icon-refresh" />
          </Button>
        </OverlayTrigger>
      </div>
      <div className="toolbar__item">
        <Button variant="outline-primary" className="border-0" onClick={() => dispatch(actionCropElement(false))}>
          <span className="fontSize--10 p--5 whiteSpace--nowrap">XONG</span>
        </Button>
      </div>
    </ButtonGroup>
  )
}

export default memo(ToolbarCrop)
