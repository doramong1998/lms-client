import React, { FunctionComponent } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'

export interface Props {
  event: string
  setEvent: any
  el: any
}

const BackgroundTypes: FunctionComponent<Props> = ({ event, setEvent, el }) => {
  const renderColor = (value: string) => {
    switch (value) {
      case 'color': return <>Màu cơ bản</>
      case 'gradient': return <>Màu Gradient</>
      case 'image': return <>Hình ảnh</>
      default: return null
    }
  }
  return (
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Chọn kiểu</label>
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
                    onClick={() => setEvent('color')}
                  >
                    Màu cơ bản
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => setEvent('gradient')}
                  >
                    Màu gradient
                  </Button>
                  {(el?.type === 'section' || el?.type === 'box') && (
                    <Button
                      variant="outline-primary"
                      onClick={() => setEvent('image')}
                    >
                      Hình ảnh
                    </Button>
                  )}

                </ButtonGroup>
              </Popover.Content>
            </Popover>
          )}
        >
          <Button className="__title">
            {renderColor(event)}
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default BackgroundTypes
