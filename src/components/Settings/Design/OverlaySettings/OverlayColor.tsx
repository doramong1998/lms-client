import React, { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import { ApplicationState } from '../../../../store'
import ColorPicker from '../../../ColorPicker'

export interface Props {
  el: any
  type: string
}

const OverlaysColor: FunctionComponent<Props> = ({ el, type }) => {
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedElement = html[type]?.find((item: any) => item?.id === el?.id)

  const [visibleColor, setVisibleColor] = useState<any>(false)

  const openColorPicker = (value: string) => {
    setVisibleColor({ type: value, template: type })
  }

  const colorButton = css`
    cursor:pointer;
    background-color: ${selectedElement?.overlayColor} !important;  
  `

  return (
    <>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Màu nền</label>
        <div className={`__collapse__content ${colorButton}`} onClick={() => openColorPicker('overlayColor')} />
      </div>
      {visibleColor && <ColorPicker valueColor={visibleColor} top={-200} left={-400} el={el} onClose={() => setVisibleColor(false)} />}
    </>
  )
}

export default OverlaysColor
