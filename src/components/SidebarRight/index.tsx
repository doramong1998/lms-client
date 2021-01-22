import React, { FunctionComponent, memo } from 'react'
import {
  ButtonGroup, Button,
} from 'react-bootstrap'
import Draggable from 'react-draggable'
import { useHistory } from 'react-router-dom'
import './styles.scss'
import Public from './Public'
import ComeBack from './ComeBack'
import UndoRedo from './UndoRedo'
import Settings from './Settings'
import Device from './Device'

export interface Props { }

const SidebarRight: FunctionComponent<Props> = () => {
  const history = useHistory()

  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      handle=".handle"
    >
      <div className="sidebar--right">
        <ButtonGroup vertical size="sm">
          <Button variant="outline-primary" className="handle first-child">
            <i className="hi-icon icon-dots" />
          </Button>
          {history.location.pathname !== '/preview' ? (
            <>
              <Public />
              <Device />
              <UndoRedo />
              <Settings />
            </>
          ) : (
            <>
              <ComeBack />
              <Device />
            </>
          )}
        </ButtonGroup>
      </div>
    </Draggable>
  )
}

export default memo(SidebarRight)
