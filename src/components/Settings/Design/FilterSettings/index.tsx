import React, { FunctionComponent, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import Contrast from './Contrast'
import Brightness from './Brightness'
import Saturate from './Saturate'
import Sepia from './Sepia'
import Grayscale from './Grayscale'
import Invert from './Invert'
import HueRotate from './HueRotate'
import Blur from './Blur'

export interface Props {
    type: string
    el: any
 }

const TransformSettings: FunctionComponent<Props> = ({ type, el }) => {
  const [key, setKey] = useState(false)
  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            FILTER
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <Contrast el={el} type={type} />
          <Brightness el={el} type={type} />
          <Saturate el={el} type={type} />
          <Grayscale el={el} type={type} />
          <Blur el={el} type={type} />
          <Invert el={el} type={type} />
          <Sepia el={el} type={type} />
          <HueRotate el={el} type={type} />
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default TransformSettings
