import React, { FunctionComponent, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import AutoScroll from './AutoScroll'
import Thumb from './Thumb'
import Images from './Images'

export interface Props {
    el?: any
    type?: string
}

const SizeSettings: FunctionComponent<Props> = ({ el }) => {
  const [key, setKey] = useState(false)
  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            THIẾT LẬP GALLERY
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <Images el={el} />
          <AutoScroll el={el} />
          <Thumb el={el} />
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default SizeSettings
