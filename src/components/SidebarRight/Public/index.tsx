import React, { FunctionComponent, useState } from 'react'
import {
  Button, Popover, OverlayTrigger,
} from 'react-bootstrap'
import ModalPublic from './ModalPublic'
import Preview from './Preview'
import Publish from './Publish'
import Save from './Save'

export interface Props { }

const Public: FunctionComponent<Props> = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  return (
    <>
      <OverlayTrigger
        trigger="focus"
        placement="left"
        overlay={(
          <Popover id="popover-basic" className="sidebar--right__popover">
            <Popover.Content>
              <Preview />
              <Publish openModal={() => setVisibleModal(true)} />
              <Save />
            </Popover.Content>
          </Popover>
        )}
      >
        <Button variant="outline-primary" className="py-2">
          <i className="hi-icon icon-publish" />
          <br />
          <span>Xuất bản</span>
        </Button>
      </OverlayTrigger>
      <ModalPublic visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
    </>
  )
}

export default Public
