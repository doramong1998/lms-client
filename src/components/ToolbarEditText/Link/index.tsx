import React, { FunctionComponent, useMemo } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import Draggable from 'react-draggable'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'

export interface Props {
  el: any
  left?: any
  top?: any
  onClose: any
  handleLink: any
}

const Link: FunctionComponent<Props> = ({
  el, left, top, onClose, handleLink,
}) => {
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const selectedElement = useMemo(() => html?.elements?.find((item: any) => item?.id === selectedId), [html, selectedId])

  return (
    <>
      {!dragging && (
        <Draggable
          defaultPosition={{ x: el?.hasOwnProperty('formId') ? 150 : (left ? left + 300 : 0), y: top ? top : 50 }}
          handle=".settings__handle"
        >
          <div className="settings settings--link">
            <div className="settings__handle">
              <i className="hi-icon icon-dots" />
              <i className="hi-icon icon-e-remove" style={{ right: 0, cursor: 'pointer', position: 'absolute' }} onClick={onClose} />
            </div>
            <div className="settings__layout">
              <div className="settings__item">
                <div className="__collapse">
                  <div className="d-flex align-items-center justify-content-between my-2">
                    <label>Liên kết</label>
                    <div className="__collapse__content">
                      <input type="text" defaultValue="" onChange={(e: any) => handleLink(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="settings__item">
                <div className="__collapse">
                  <div className="d-flex align-items-center justify-content-between my-2">
                    <label>Mở liên kết trên</label>
                    <div className="__collapse__content">
                      <OverlayTrigger
                        trigger="focus"
                        placement="bottom"
                        overlay={(
                          <Popover id="popover-basic" className="settings__popover">
                            <Popover.Content>
                              <ButtonGroup vertical size="sm">
                                <Button
                                  variant="outline-primary"
                                  className="border-bottom"
                                >
                                  Cửa sổ mới
                                </Button>
                                <Button
                                  variant="outline-primary"
                                  className="border-bottom"
                                >
                                  Trang hiện tại
                                </Button>
                              </ButtonGroup>
                            </Popover.Content>
                          </Popover>
                        )}
                      >
                        <Button className="__title">{selectedElement?.link?.target === '_blank' ? 'Cửa sổ mới' : 'Trang hiện tại'}</Button>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </>
  )
}

export default Link
