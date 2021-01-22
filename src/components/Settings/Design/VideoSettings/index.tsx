import React, { FunctionComponent, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import VideoTypes from './VideoTypes'
import ShowControl from './ShowControl'
import AutoPlay from './AutoPlay'
import VideoUrl from './VideoUrl'

export interface Props { }

const VideoSettings: FunctionComponent<Props> = () => {
  const [key, setKey] = useState(false)
  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            THIẾT LẬP VIDEO
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <VideoTypes />
          <VideoUrl />
          <ShowControl />
          <AutoPlay />
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}
export default VideoSettings
