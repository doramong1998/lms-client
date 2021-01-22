import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react'
import { SketchPicker } from 'react-color'
import { useSelector, useDispatch } from 'react-redux'
import Draggable from 'react-draggable'
import {
  Button,
} from 'react-bootstrap'
import { ApplicationState } from '../../store'
import { actionAddHistory, actionSaveHTML } from '../../store/builder/actions'
import './styles.scss'

export interface Props {
  top?: number,
  left?: number,
  el?: any,
  valueColor?: any,
  onClose: () => void
}

const ColorPicker: FunctionComponent<Props> = ({
  top, left, el, valueColor, onClose,
}) => {
  const dispatch = useDispatch()

  const [color, setColor] = useState<any>({
    r: 255,
    g: 255,
    b: 255,
    a: 100,
  })
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const history = useSelector((state: ApplicationState) => state.builder.history)
  const selectedSection = useSelector((state: ApplicationState) => state.builder.selectedSection)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)

  useEffect(() => {
    setColor(el[valueColor.type])
  }, [valueColor, el])

  const handleChange = useCallback((color: any) => {
    setColor(color.rgb)
  }, [])

  const setColorHtml = useCallback(() => {
    if (valueColor?.template === 'elements') {
      if (valueColor?.type === 'borderRadius') {
        const elements = html?.elements?.map((item: any) => {
          if (item?.id === el?.id) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                borderColor: `rgb(${color.r},${color.g},${color.b},${color.a})`,
              },
            }
          }
          return item
        })
        const formItem = html?.formItem?.map((item: any) => {
          if (item?.formId === el?.id) {
            return {
              ...item,
              borderRadius: {
                ...item.borderRadius,
                borderColor: `rgb(${color.r},${color.g},${color.b},${color.a})`,
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
          if (item?.id === el?.id) {
            return {
              ...item,
              [valueColor?.type]: `rgb(${color.r},${color.g},${color.b},${color.a})`,
            }
          }
          return item
        })
        dispatch(actionSaveHTML({
          ...html,
          elements,
        }))
        dispatch(actionAddHistory([
          ...history,
          {
            ...html,
            elements,
          },
        ]))
      }
    } else if (valueColor?.template === 'formItem') {
      const formItem = html?.formItem?.map((item: any) => {
        if (item?.id === el?.id) {
          return {
            ...item,
            borderRadius: {
              ...item.borderRadius,
              borderColor: `rgb(${color.r},${color.g},${color.b},${color.a})`,
              borderWidth: 4,
            },
          }
        }
        return item
      })
      dispatch(actionSaveHTML({
        ...html,
        formItem,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          formItem,
        },
      ]))
    } else {
      const sections = html?.sections?.map((item: any) => {
        if (item?.id === selectedSection?.sectionId) {
          return {
            ...item,
            [valueColor?.type]: `rgb(${color.r},${color.g},${color.b},${color.a})`,
          }
        }
        return item
      })
      dispatch(actionSaveHTML({
        ...html,
        sections,
      }))
      dispatch(actionAddHistory([
        ...history,
        {
          ...html,
          sections,
        },
      ]))
    }
    onClose()
  }, [dispatch, el, html, onClose, selectedSection, valueColor, color, history])

  return (
    <>
      {valueColor && !dragging && (
        <Draggable
          defaultPosition={{ x: left ? left + 200 : 200, y: top ? top : 300 }}
          handle=".colorPicker__handle"
        >
          <div className="colorPicker">
            <div className="colorPicker__handle">
              <i className="hi-icon icon-dots" />
              <i className="hi-icon icon-e-remove" style={{ right: 0, cursor: 'pointer', position: 'absolute' }} onClick={onClose} />
            </div>
            <SketchPicker className="colorPicker__color" color={color} onChange={handleChange} />
            <div className="d-flex align-items-center justify-content-end">
              <Button variant="outline-primary" size="sm" onClick={() => setColorHtml()}>Lưu</Button>
            </div>
          </div>
        </Draggable>
      )}
    </>
  )
}

export default ColorPicker
