import React, { FunctionComponent } from 'react'
import {
  Button, Popover, OverlayTrigger,
} from 'react-bootstrap'
import Redo from './Redo'
import Undo from './Undo'

export interface Props { }

const UndoRedo: FunctionComponent<Props> = () => (
  <OverlayTrigger
    trigger="focus"
    placement="left"
    overlay={(
      <Popover id="popover-basic" className="sidebar--right__popover">
        <Popover.Content>
          <Redo />
          <Undo />
        </Popover.Content>
      </Popover>
    )}
  >
    <Button variant="outline-primary" className="py-2">
      <i className="hi-icon icon-undo" />
      <br />
      <span>Undo</span>
    </Button>
  </OverlayTrigger>
)

export default UndoRedo
