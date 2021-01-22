import React, { FunctionComponent, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import Opacity from './Opacity'
import Rotate from './Rotate'
import RotateX from './RotateX'
import RotateY from './RotateY'
import SkewX from './SkewX'
import SkewY from './SkewY'
import Perspective from './Perspective'

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
            TRANSFORM
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <Opacity el={el} type={type} />
          <Rotate el={el} type={type} />
          <RotateX el={el} type={type} />
          <RotateY el={el} type={type} />
          <SkewX el={el} type={type} />
          <SkewY el={el} type={type} />
          <Perspective el={el} type={type} />
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default TransformSettings
