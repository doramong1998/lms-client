import React, { FunctionComponent } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'

export interface Props {
  event: string
  setEvent: any
}

const OverlayTypes: FunctionComponent<Props> = ({ event, setEvent }) => (
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
                  onClick={() => setEvent('image')}
                >
                  Hình ảnh
                </Button>
              </ButtonGroup>
            </Popover.Content>
          </Popover>
        )}
      >
        <Button className="__title">
          {event === 'image' ? 'Hình ảnh' : 'Màu cơ bản'}
        </Button>
      </OverlayTrigger>
    </div>
  </div>
)

export default OverlayTypes
