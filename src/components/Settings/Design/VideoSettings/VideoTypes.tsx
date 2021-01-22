import React, { FunctionComponent } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'

export interface Props { }

const VideoTypes: FunctionComponent<Props> = () => (
  <div className="d-flex align-items-center justify-content-between my-2">
    <label>Kiểu video</label>
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
                >
                  Youtube
                </Button>
              </ButtonGroup>
            </Popover.Content>
          </Popover>
        )}
      >
        <Button className="__title">Youtube</Button>
      </OverlayTrigger>
    </div>
  </div>
)

export default VideoTypes
