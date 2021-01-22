import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  OverlayTrigger, Popover, ButtonGroup, Button,
} from 'react-bootstrap'

export interface Props {
  onChange: (key: string, value: any) => void
  el: any
}

const ShowTime: FunctionComponent<Props> = ({ onChange, el }) => {
  const [showDate, setShowDate] = useState(false)
  const [showHour, setShowHour] = useState(false)
  const [showMinute, setShowMinute] = useState(false)
  const [showSecond, setShowSecond] = useState(false)

  useEffect(() => {
    setShowDate(el?.countdown?.showDate)
    setShowHour(el?.countdown?.showHour)
    setShowMinute(el?.countdown?.showMinute)
    setShowSecond(el?.countdown?.showSecond)
  }, [el])

  return (
    <>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Hiện ngày</label>
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
                      onClick={() => onChange('showDate', false)}
                    >
                      Không
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => onChange('showDate', true)}
                    >
                      Có
                    </Button>
                  </ButtonGroup>
                </Popover.Content>
              </Popover>
                )}
          >
            <Button className="__title">
              {showDate ? 'Có' : 'Không'}
            </Button>
          </OverlayTrigger>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Hiện giờ</label>
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
                      onClick={() => onChange('showHour', false)}
                    >
                      Không
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => onChange('showHour', true)}
                    >
                      Có
                    </Button>
                  </ButtonGroup>
                </Popover.Content>
              </Popover>
                )}
          >
            <Button className="__title">
              {showHour ? 'Có' : 'Không'}
            </Button>
          </OverlayTrigger>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Hiện phút</label>
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
                      onClick={() => onChange('showMinute', false)}
                    >
                      Không
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => onChange('showMinute', true)}
                    >
                      Có
                    </Button>
                  </ButtonGroup>
                </Popover.Content>
              </Popover>
                )}
          >
            <Button className="__title">
              {showMinute ? 'Có' : 'Không'}
            </Button>
          </OverlayTrigger>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Hiện giây</label>
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
                      onClick={() => onChange('showSecond', false)}
                    >
                      Không
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => onChange('showSecond', true)}
                    >
                      Có
                    </Button>
                  </ButtonGroup>
                </Popover.Content>
              </Popover>
                )}
          >
            <Button className="__title">
              {showSecond ? 'Có' : 'Không'}
            </Button>
          </OverlayTrigger>
        </div>
      </div>
    </>
  )
}

export default ShowTime
