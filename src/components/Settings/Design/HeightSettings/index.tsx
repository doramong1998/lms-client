import React, { FunctionComponent, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import HeightSection from './HeightSection'

export interface Props { }

const HeightSettings: FunctionComponent<Props> = () => {
  const [key, setKey] = useState(false)
  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            KÍCH THƯỚC
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <HeightSection />
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default HeightSettings
