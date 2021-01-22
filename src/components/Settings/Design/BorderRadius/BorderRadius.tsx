import React, { FunctionComponent, useEffect, useState } from 'react'

export interface Props {
  onChangeValue: any
  el: any
}

const BorderRadius: FunctionComponent<Props> = ({ onChangeValue, el }) => {
  const [all, setAll] = useState(0)
  const [topLeft, setTopLeft] = useState(0)
  const [topRight, setTopRight] = useState(0)
  const [bottomLeft, setBottomLeft] = useState(0)
  const [bottomRight, setBottomRight] = useState(0)

  useEffect(() => {
    setAll(el?.borderRadius?.borderAll)
    setTopLeft(el?.borderRadius?.borderTopLeftRadius)
    setTopRight(el?.borderRadius?.borderTopRightRadius)
    setBottomLeft(el?.borderRadius?.borderBottomLeftRadius)
    setBottomRight(el?.borderRadius?.borderBottomRightRadius)
  }, [el])

  return (
    <>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Bo góc tất cả</label>
        <div className="__collapse__content">
          <input type="number" min={0} value={all} onChange={e => onChangeValue('borderAll', parseInt(e.target.value, 10))} />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Bo góc trái trên</label>
        <div className="__collapse__content">
          <input type="number" min={0} value={topLeft} onChange={e => onChangeValue('borderTopLeftRadius', parseInt(e.target.value, 10))} />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Bo góc phải trên</label>
        <div className="__collapse__content">
          <input type="number" min={0} value={topRight} onChange={e => onChangeValue('borderTopRightRadius', parseInt(e.target.value, 10))} />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Bo góc trái dưới</label>
        <div className="__collapse__content">
          <input type="number" min={0} value={bottomLeft} onChange={e => onChangeValue('borderBottomLeftRadius', parseInt(e.target.value, 10))} />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <label>Bo góc phải dưới</label>
        <div className="__collapse__content">
          <input type="number" min={0} value={bottomRight} onChange={e => onChangeValue('borderBottomRightRadius', parseInt(e.target.value, 10))} />
        </div>
      </div>
    </>
  )
}

export default BorderRadius
