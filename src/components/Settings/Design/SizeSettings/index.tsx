import React, { FunctionComponent, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import Height from './Height'
import Width from './Width'

export interface Props {
    el?: any
    type?: string
}

const SizeSettings: FunctionComponent<Props> = ({ el, type }) => {
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
          {el?.type !== 'heading' && el?.type !== 'paragraph' && el?.type !== 'list' && el?.type !== 'line' && <Height el={el} type={type} /> }
          <Width el={el} type={type} />
        </div>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default SizeSettings
