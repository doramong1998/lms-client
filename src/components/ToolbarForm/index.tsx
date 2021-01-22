import React, { useState, FunctionComponent, useEffect } from 'react'
import {
  ButtonGroup, Button, OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { css } from 'emotion'
import { useSelector } from 'react-redux'
import './styles.scss'
import { ApplicationState } from '../../store'
import Delete from './Delete'
import Forward from './Forward'
import Backward from './Backward'
import Settings from '../Settings'
import BorderRadius from './BorderRadius'
import ColorPicker from '../ColorPicker'
import Hide from './Hide'

export interface Props {
  el?: any
}

const Toolbar: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)

  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [visibleToolbar, setVisibleToolbar] = useState(false)
  const [visibleSettings, setVisibleSettings] = useState(false)
  const [visibleColor, setVisibleColor] = useState<any>(false)

  const selectedItem = html?.formItem?.find((item: any) => item?.id === selectedId)

  useEffect(() => {
    if (!dragging && html) {
      let show = false
      for (const item of html?.formItem) {
        if (item?.id === selectedId) {
          show = true
          setTop(item[device]?.top)
          setLeft(item[device]?.left)
        }
      }
      if (show) {
        setVisibleToolbar(true)
      } else setVisibleToolbar(false)
    }
  }, [html, selectedId, dragging, device])
  useEffect(() => {
    if (!visibleToolbar) {
      setVisibleSettings(false)
    }
  }, [visibleToolbar])

  const openColorPicker = (value: string) => {
    setVisibleColor({ type: value, template: 'formItem' })
  }

  const stylesElement = css`
    top: calc(${top}px - 45px);
    left: ${left}px;
  `

  return (
    <>
      {visibleToolbar && selectedItem?.formId === el?.id && (
        <div onClick={(e) => e.stopPropagation()}>
          <ButtonGroup size="sm" className={`toolbar ${visibleToolbar ? stylesElement : ''}`}>
            <div className="toolbar__item">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="up">Lên trên</Tooltip>}
              >
                <Button variant="outline-primary" className="border-0">
                  <Forward selectedId={selectedId} />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="down">Xuống dưới</Tooltip>}
              >
                <Button variant="outline-primary" className="border-0">
                  <Backward selectedId={selectedId} />
                </Button>
              </OverlayTrigger>
              {selectedItem?.tag !== 'button' && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="delete">Xóa</Tooltip>}
                >
                  <Button variant="outline-primary" className="border-0">
                    <Delete selectedId={selectedId} />
                  </Button>
                </OverlayTrigger>
              )}
              {selectedItem?.tag === 'button' && (
                <>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="background">Màu nền</Tooltip>}
                  >
                    <Button variant="outline-primary" className="border-0">
                      <i className="hi-icon icon-palette" onClick={() => openColorPicker('backgroundColor')} />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="delete">Bo góc</Tooltip>}
                  >
                    <Button variant="outline-primary" className="border-0">
                      <BorderRadius selectedId={selectedId} />
                    </Button>
                  </OverlayTrigger>
                </>
              )}
              <div className="border-left mx-1" />
              <Hide el={selectedItem} />
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="delete">Cài đặt</Tooltip>}
              >
                <Button variant="outline-primary" className="border-0">
                  <i className="hi-icon icon-settings" onClick={() => setVisibleSettings(!visibleSettings)} />
                </Button>
              </OverlayTrigger>
            </div>
          </ButtonGroup>
          {visibleColor && <ColorPicker valueColor={visibleColor} top={-200} left={-400} el={selectedItem} onClose={() => setVisibleColor(false)} />}
          {visibleSettings && <Settings onClose={() => setVisibleSettings(false)} top={top} el={selectedItem} />}
        </div>
      )}
    </>
  )
}

export default Toolbar
