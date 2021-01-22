import React, { FunctionComponent } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'

export interface Props { }

const ShowControl: FunctionComponent<Props> = () => (
  <div className="d-flex align-items-center justify-content-between my-2">
    <label>Hiện control</label>
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
                  Có
                </Button>
                <Button
                  variant="outline-primary"
                >
                  Không
                </Button>
              </ButtonGroup>
            </Popover.Content>
          </Popover>
        )}
      >
        <Button className="__title">Có</Button>
      </OverlayTrigger>
    </div>
  </div>
)

export default ShowControl
