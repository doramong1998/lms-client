import React, { FunctionComponent, useState } from 'react'
import {
  ButtonGroup, Button, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import '../Event/Group/styles'
import { css } from 'emotion'
import $ from 'jquery'
import { useSelector } from 'react-redux'
import Link from './Link'
import { ApplicationState } from '../../store'
import { common } from '../../utils'

export interface Props {
  el: any
  onToggleStyle: (data: string) => void
  unLink: () => void
  top?: any
  left?: number
  handleLink: any
}

const ToolbarEditText: FunctionComponent<Props> = ({
  el, onToggleStyle, unLink, top, left, handleLink,
}) => {
  const [visibleLink, setVisibleLink] = useState(false)

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const calcLeft = () => {
    const widthWindow = window.innerWidth
    const leftCalc = (left ? left : 0) + (widthWindow - (common.CalcWidth(device, html))) / 2
    const center = widthWindow / 2
    if (center > leftCalc) return true
    return false
  }

  const widthElement: any = $(`#${el?.id}`) ? $(`#${el?.id}`).width() : 0
  const widthToolbar: any = $('#toolbarEditText') ? $('#toolbarEditText').width() : 0
  const heightElement: any = $(`#${el?.id}`) ? $(`#${el?.id}`).height() : 0
  const stylesElement = css`
    top: ${(top > 50 ? (top - 45) : (top + heightElement + 50))}px;
    ${calcLeft()
    ? `left: ${left}px`
    : `left: ${(left ? left : 0) - widthToolbar + widthElement}px`}
  `

  return (
    <>
      <ButtonGroup size="sm" className={`toolbar ${stylesElement}`} id="toolbarEditText">
        <div className="toolbar__item">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="groupDelete">Liên kết</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => setVisibleLink(true)}>
              <i className="hi-icon icon-hyperlink" />
            </Button>
          </OverlayTrigger>
        </div>
        <div className="toolbar__item">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="groupDelete">Hủy liên kết</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={unLink}>
              <i className="hi-icon icon-link-broken" />
            </Button>
          </OverlayTrigger>
        </div>
        <div className="toolbar__item">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="groupElement">In đậm</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => onToggleStyle('BOLD')}>
              <i className="hi-icon icon-bold" />
            </Button>
          </OverlayTrigger>
        </div>
        <div className="toolbar__item">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="groupElement">In nghiêng</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => onToggleStyle('ITALIC')}>
              <i className="hi-icon icon-italic" />
            </Button>
          </OverlayTrigger>
        </div>
        <div className="toolbar__item">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="groupElement">Gạch chân</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => onToggleStyle('UNDERLINE')}>
              <i className="hi-icon icon-underline" />
            </Button>
          </OverlayTrigger>
        </div>
        <div className="toolbar__item">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="groupElement">Gạch ngang</Tooltip>}
          >
            <Button variant="outline-primary" className="border-0" onClick={() => onToggleStyle('STRIKETHROUGH')}>
              <i className="hi-icon icon-strikethrough" />
            </Button>
          </OverlayTrigger>
        </div>
      </ButtonGroup>
      {visibleLink && <Link el={el} top={top} left={left} onClose={() => setVisibleLink(false)} handleLink={handleLink} />}
    </>
  )
}

export default ToolbarEditText
