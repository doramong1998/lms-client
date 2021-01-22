import React, { FunctionComponent, useState, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import $ from 'jquery'
import { ApplicationState } from '../../../../store'
import FontStyle from './FontStyle'
import TextAlign from './TextAlign'
import LineHeight from './LineHeight'
import FontFamily from './FontFamily'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'
import ColorPicker from '../../../ColorPicker'

export interface Props {
  el: any
}

const TextSettings: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const [visibleColor, setVisibleColor] = useState<any>(false)
  const [fontSize, setFontSize] = useState(0)
  const [color, setColor] = useState('')
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [padding, setPadding] = useState(0)
  const [key, setKey] = useState(false)

  useEffect(() => {
    setFontSize(el?.[device]?.fontSize)
    setColor(el?.color)
    setLetterSpacing(el?.letterSpacing)
    setPadding(el?.padding)
  }, [el, device])

  const openColorPicker = (value: string) => {
    setVisibleColor({ type: value, template: 'elements' })
  }

  const colorButton = css`
    cursor:pointer;
    background-color: ${color} !important;
  `

  const changeValue = (key: string, value: number) => {
    if (key === 'fontSize') {
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === selectedId) {
          return {
            ...item,
            [device]: {
              ...item[device],
              [key]: value,
              height: item?.type !== 'button' ? $(`#${item?.id}`).height() : item[device]?.height,
            },
          }
        }
        return item
      })
      const formItem = html?.formItem?.map((item: any) => {
        if (item?.formId === selectedId) {
          return {
            ...item,
            [device]: {
              ...item[device],
              [key]: value,
              height: item?.type !== 'button' ? $(`#${item?.id}`).height() : item[device]?.height,
            },
          }
        }
        return item
      })
      dispatch(actionSaveHTML({
        ...html,
        elements,
        formItem,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements,
          formItem,
        },
      ]))
    } else {
      const elements = html?.elements?.map((item: any) => {
        if (item?.id === selectedId) {
          return {
            ...item,
            [key]: value,
          }
        }
        return item
      })
      const formItem = html?.formItem?.map((item: any) => {
        if (item?.formId === selectedId) {
          return {
            ...item,
            [key]: value,
          }
        }
        return item
      })
      dispatch(actionSaveHTML({
        ...html,
        elements,
        formItem,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          elements,
          formItem,
        },
      ]))
    }
  }

  return (
    <Accordion className="settings__item">
      <Accordion.Toggle className="__toggle" as="div" eventKey="0" onClick={() => setKey(!key)}>
        <div className="__heading">
          <div className="left">
            THIẾT LẬP CHỮ
          </div>
          <div className="right">
            {!key ? <i className="hi-icon icon-triangle-right" /> : <i className="hi-icon icon-triangle-down" />}
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" className="__collapse">
        <div>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Màu chữ </label>
            <div className={`__collapse__content ${colorButton}`} onClick={() => openColorPicker('color')} />
          </div>
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Cỡ chữ</label>
            <div className="__collapse__content">
              <input type="number" min={0} value={fontSize} onChange={e => changeValue('fontSize', parseInt(e.target.value, 10))} />
            </div>
          </div>
          <FontStyle el={el} />
          <TextAlign el={el} />
          <FontFamily el={el} />
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Khoảng cách chữ</label>
            <div className="__collapse__content">
              <input type="number" value={letterSpacing} min={0} onChange={e => changeValue('letterSpacing', parseInt(e.target.value, 10))} />
            </div>
          </div>
          <LineHeight el={el} />
          <div className="d-flex align-items-center justify-content-between my-2">
            <label>Khoảng cách 2 bên</label>
            <div className="__collapse__content">
              <input type="number" value={padding} min={0} onChange={e => changeValue('padding', parseInt(e.target.value, 10))} />
            </div>
          </div>
        </div>
      </Accordion.Collapse>
      { visibleColor && key && <ColorPicker valueColor={visibleColor} top={-400} left={-400} el={el} onClose={() => setVisibleColor(false)} />}
    </Accordion>
  )
}
export default TextSettings
