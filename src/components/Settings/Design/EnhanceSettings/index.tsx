import React, { FunctionComponent, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import Name from './Name'
import StyleCss from './StyleCss'

export interface Props {
    type: string
    el: any
 }

const EnhanceSettings: FunctionComponent<Props> = ({ type, el }) => {
  const [key, setKey] = useState(false)
  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            NÂNG CAO
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <Name el={el} type={type} />
          <StyleCss el={el} type={type} />
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default EnhanceSettings
