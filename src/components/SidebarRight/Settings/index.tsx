import React, { FunctionComponent, useState } from 'react'
import {
  Button, Popover, OverlayTrigger,
} from 'react-bootstrap'
import Meta from './Meta'
import ConversionCode from './ConversionCode'
import JsCssCode from './JsCssCode'
import ModalSettings from './ModalSettings'
import SettingsPage from './SettingsPage'
import ModalSettingsPage from './ModalSettingsPage'

export interface Props { }

const Settings: FunctionComponent<Props> = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [eventKey, setEventKey] = useState(0)
  const [visible, setVisible] = useState(false)

  return (
    <>
      <OverlayTrigger
        trigger="focus"
        placement="left"
        overlay={(
          <Popover id="popover-basic" className="sidebar--right__popover">
            <Popover.Content>
              <Meta openModal={() => {
                setEventKey(0)
                setVisibleModal(true)
              }}
              />
              <ConversionCode openModal={() => {
                setEventKey(1)
                setVisibleModal(true)
              }}
              />
              <JsCssCode openModal={() => {
                setEventKey(2)
                setVisibleModal(true)
              }}
              />
              <SettingsPage openModal={() =>
                setVisible(true)}
              />
            </Popover.Content>
          </Popover>
        )}
      >
        <Button variant="outline-primary" className="py-2">
          <i className="hi-icon icon-settings" />
          <br />
          <span>Thiết lập</span>
        </Button>
      </OverlayTrigger>
      <ModalSettings eventKey={eventKey} visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
      {visible && <ModalSettingsPage onClose={() => setVisible(false)} />}
    </>
  )
}

export default Settings
