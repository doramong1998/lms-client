import React, { FunctionComponent, useState, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import { css } from 'emotion'
import ColorPicker from '../../../ColorPicker'

export interface Props {
  el: any
}

const TextSettings: FunctionComponent<Props> = ({ el }) => {
  const [visibleColor, setVisibleColor] = useState<any>(false)
  const [color, setColor] = useState('')
  const [key, setKey] = useState(false)
  useEffect(() => {
    setColor(el?.color)
  }, [el])

  const openColorPicker = (value: string) => {
    setVisibleColor({ type: value, templace: 'elements' })
  }

  const colorButton = css`
    cursor:pointer;
    background-color: ${color} !important;
  `

  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            THIẾT LẬP SHAPE
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div className="d-flex align-items-center justify-content-between my-2">
          <label>Màu Shape </label>
          <div className={`__collapse__content ${colorButton}`} onClick={() => openColorPicker('color')} />
        </div>
      </Accordion.Collapse>
      { visibleColor && key && <ColorPicker valueColor={visibleColor} top={-150} left={-400} el={el} onClose={() => setVisibleColor(false)} />}
    </Accordion>
  )
}
export default TextSettings
