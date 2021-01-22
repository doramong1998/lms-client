import React, { FunctionComponent, useState } from 'react'
import { css } from 'emotion'
import ColorPicker from '../../../ColorPicker'

export interface Props {
  typeValue: string,
  el: any
}

const BackgroundColor: FunctionComponent<Props> = ({ typeValue, el }) => {
  const [visibleColor, setVisibleColor] = useState<any>(false)

  const openColorPicker = (value: string) => {
    setVisibleColor({ type: value, template: typeValue })
  }

  const colorButton = css`
    cursor:pointer;
    background-color: ${el?.backgroundColor} !important;  
  `

  return (
    <>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Màu nền</label>
        <div className={`__collapse__content ${colorButton}`} onClick={() => openColorPicker('backgroundColor')} />
      </div>
      {visibleColor && <ColorPicker valueColor={visibleColor} top={-200} left={-400} el={el} onClose={() => setVisibleColor(false)} />}
    </>
  )
}

export default BackgroundColor
