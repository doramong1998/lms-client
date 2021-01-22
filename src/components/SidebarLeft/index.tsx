import React, { FunctionComponent, memo } from 'react'
import {
  ButtonGroup, Button,
} from 'react-bootstrap'
import Draggable from 'react-draggable'
import './styles.scss'
import Add from './Add'
import Section from './Sections'
import Application from './Applications'

export interface Props { }

const SidebarLeft: FunctionComponent<Props> = () => (
  <Draggable
    defaultPosition={{ x: 0, y: 0 }}
    handle=".handle"
  >
    <div className="sidebar--left">
      <ButtonGroup vertical size="sm">
        <Button variant="outline-primary" className="handle">
          <i className="hi-icon icon-dots" />
        </Button>
        <Add />
        <Section />
        <Application />
      </ButtonGroup>
    </div>
  </Draggable>
)

export default memo(SidebarLeft)
