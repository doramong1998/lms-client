import React, { FunctionComponent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Draggable from 'react-draggable'
import {
  Accordion, Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import { ApplicationState } from '../../../../store'
import './style.scss'
import { actionSaveHTML, actionAddHistory } from '../../../../store/builder/actions'

export interface Props {
  onClose: () => void
}

const Settings: FunctionComponent<Props> = ({
  onClose,
}) => {
  const dispatch = useDispatch()
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const [key, setKey] = useState(true)
  const changeTarget = (key: string, value: number) => {
    const settings = { ...html?.settings }
    settings[key] = value
    dispatch(actionSaveHTML({
      ...html,
      settings,
    }))
    dispatch(actionAddHistory([
      ...history,
      {
        ...html,
        settings,
      },
    ]))
  }

  return (
    <>
      {!dragging && (
        <Draggable
          defaultPosition={{ x: -400, y: 0 }}
          handle=".settings__handle"
        >
          <div className="settings-modal">
            <div className="settings__handle">
              <i className="hi-icon icon-dots" />
              <i className="hi-icon icon-e-remove" style={{ right: 0, cursor: 'pointer', position: 'absolute' }} onClick={onClose} />
            </div>
            <div className="settings__layout">
              <Accordion className="settings__item" defaultActiveKey="0">
                <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
                  <div className="__heading">
                    <div className="left">
                      THIẾT LẬP TOÀN TRANG
                    </div>
                    <div className="right">
                      {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="__collapse">
                  <div>
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
                                    onClick={() => changeTarget('desktop', 1200)}
                                  >
                                    1200px
                                  </Button>
                                  <Button
                                    variant="outline-primary"
                                    className="border-bottom"
                                    onClick={() => changeTarget('desktop', 960)}
                                  >
                                    960px
                                  </Button>
                                </ButtonGroup>
                              </Popover.Content>
                            </Popover>
          )}
                        >
                          <Button className="__title">{`${html?.settings?.desktop ? html?.settings?.desktop : 960}px`}</Button>
                        </OverlayTrigger>
                      </div>
                    </div>
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
                                    onClick={() => changeTarget('mobile', 420)}
                                  >
                                    420px
                                  </Button>
                                  <Button
                                    variant="outline-primary"
                                    className="border-bottom"
                                    onClick={() => changeTarget('mobile', 375)}
                                  >
                                    375px
                                  </Button>
                                </ButtonGroup>
                              </Popover.Content>
                            </Popover>
          )}
                        >
                          <Button className="__title">{`${html?.settings?.mobile ? html?.settings?.mobile : 375}px`}</Button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                </Accordion.Collapse>
              </Accordion>
            </div>
          </div>
        </Draggable>
      )}
    </>
  )
}

export default Settings
