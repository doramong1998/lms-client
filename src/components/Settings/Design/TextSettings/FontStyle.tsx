import React, { FunctionComponent, useState, useEffect } from 'react'
import {
  OverlayTrigger, Tooltip,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import { ApplicationState } from '../../../../store'
import { actionAddHistory, actionSaveHTML } from '../../../../store/builder/actions'

export interface Props {
  el?: any
 }

const FontStyle: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const [fontStyle, setFontStyle] = useState({
    fontStyle: 'none',
    fontWeight: 'none',
    textDecorationLine: 'none',
    textTransform: 'none',
  })
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)

  useEffect(() => {
    setFontStyle({
      fontStyle: el?.fontStyle,
      fontWeight: el?.fontWeight,
      textDecorationLine: el?.textDecorationLine,
      textTransform: el?.textTransform,
    })
  }, [el])

  const onChangeElement = (value: any) => {
    const fontStyleChange = { ...fontStyle }
    switch (value) {
      case 'bold': {
        if (fontStyle.fontWeight !== 'bold') {
          fontStyleChange.fontWeight = 'bold'
        } else fontStyleChange.fontWeight = 'normal'
        break
      }
      case 'italic': {
        if (fontStyle.fontStyle !== 'italic') {
          fontStyleChange.fontStyle = 'italic'
        } else fontStyleChange.fontStyle = 'normal'
        break
      }
      case 'underline': {
        if (fontStyle.textDecorationLine !== 'underline') {
          fontStyleChange.textDecorationLine = 'underline'
        } else fontStyleChange.textDecorationLine = 'none'
        break
      }
      case 'strikethrough': {
        if (fontStyle.textDecorationLine !== 'line-through') {
          fontStyleChange.textDecorationLine = 'line-through'
        } else fontStyleChange.textDecorationLine = 'none'
        break
      }
      case 'capsAll': {
        if (fontStyle.textTransform !== 'uppercase') {
          fontStyleChange.textTransform = 'uppercase'
        } else fontStyleChange.textTransform = 'none'
        break
      }
      default: break
    }
    setFontStyle(fontStyleChange)
    const elements = html?.elements?.map((item: any) => {
      if (item?.id === selectedId) {
        return {
          ...item,
          fontStyle: fontStyleChange.fontStyle,
          fontWeight: fontStyleChange.fontWeight,
          textDecorationLine: fontStyleChange.textDecorationLine,
          textTransform: fontStyleChange.textTransform,
        }
      }
      return item
    })
    const formItem = html?.formItem?.map((item: any) => {
      if (item?.formId === selectedId) {
        return {
          ...item,
          fontStyle: fontStyleChange.fontStyle,
          fontWeight: fontStyleChange.fontWeight,
          textDecorationLine: fontStyleChange.textDecorationLine,
          textTransform: fontStyleChange.textTransform,
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

  return (
    <div className="d-flex align-items-center justify-content-between my-2">
      <label>Định dạng</label>
      <div className="__collapse__content">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="bold">In đậm</Tooltip>}
        >
          <i
            className={`hi-icon icon-bold ${styles.iconCustom} ${fontStyle.fontWeight === 'bold' ? styles.active : ''}`}
            onClick={() => onChangeElement('bold')}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="italic">In nghiêng</Tooltip>}
        >
          <i
            className={`hi-icon icon-italic ${styles.iconCustom} ${fontStyle.fontStyle === 'italic' ? styles.active : ''}`}
            onClick={() => onChangeElement('italic')}
          />
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="underline">Gạch chân</Tooltip>}
        >
          <i
            className={`hi-icon icon-underline ${styles.iconCustom} ${fontStyle.textDecorationLine === 'underline' ? styles.active : ''}`}
            onClick={() => onChangeElement('underline')}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="strikethrough">Gạch ngang</Tooltip>}
        >
          <i
            className={`hi-icon icon-strikethrough ${styles.iconCustom} ${fontStyle.textDecorationLine === 'line-through' ? styles.active : ''}`}
            onClick={() => onChangeElement('strikethrough')}
          />
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="capsAll">In hoa</Tooltip>}
        >
          <i
            className={`hi-icon icon-caps-all ${styles.iconCustom} ${fontStyle.textTransform === 'uppercase' ? styles.active : ''}`}
            onClick={() => onChangeElement('capsAll')}
          />
        </OverlayTrigger>
      </div>
    </div>
  )
}
export default FontStyle
