import React, { FunctionComponent } from 'react'
import {
  Button, ButtonGroup, OverlayTrigger, Popover,
} from 'react-bootstrap'
import { listEvent } from '../../../../utils/listEvent'

export interface Props {
  event:string, setEvent: any
 }

const Event: FunctionComponent<Props> = ({ event, setEvent }) => {
  const renderEvent = (value:string) => {
    for (const item of listEvent) {
      if (item.value === value) {
        return item.name
      }
    }
  }
  return (
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Sự kiện</label>
      <div className="__collapse__content">
        <OverlayTrigger
          trigger="focus"
          placement="bottom"
          overlay={(
            <Popover id="popover-basic" className="settings__popover">
              <Popover.Content>
                <ButtonGroup vertical size="sm">
                  {listEvent.map((item:any, index:number) => (
                    <Button
                      variant="outline-primary"
                      className="border-bottom"
                      key={index}
                      onClick={() => setEvent(item.value)}
                    >
                      {item.name}
                    </Button>
                  ))}

                </ButtonGroup>
              </Popover.Content>
            </Popover>
      )}
        >
          <Button className="__title">{renderEvent(event)}</Button>
        </OverlayTrigger>
      </div>
    </div>
  )
}

export default Event
