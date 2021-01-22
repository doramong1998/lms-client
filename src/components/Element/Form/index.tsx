import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from './styles'
import FormElement from './FormElement'
import {
  Toolbar, ToolbarForm, Event,
} from '../..'
import { ApplicationState } from '../../../store'
import { actionSelectId } from '../../../store/builder/actions'
import { FormProps } from '../../../utils/types/templates'

export interface Props {
  el: FormProps,
}

const Video: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const formResize = useSelector((state: ApplicationState) => state.event.formResize)
  const editingCarosel = useSelector((state: ApplicationState) => state.event.editingCarosel)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId) || html?.formItem?.find((item: any) => item?.id === selectedId)
  const [edit, setEdit] = useState(false)
  const [hover, setHover] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setTop(el[device]?.top || 0)
    setLeft(el[device]?.left || 0)
    setWidth(el[device]?.width || 0)
    setHeight(el[device]?.height || 0)
  }, [dispatch, el, device, selectedId])

  const onResize = useCallback((position: { x: number; y: number }, size: { width: number, height: number }) => {
    setTop((el[device]?.top || 0) + position.y)
    setLeft((el[device]?.left || 0) + position.x)
    setWidth(size.width)
    setHeight(size.height)
  }, [device, el])

  const renderFormStyle = () => {
    let style = ''
    html?.formItem?.forEach((value: any) => {
      if (value?.formId === selectedId) {
        style += `#${value?.id} {
          ${formResize && resizing && `
            top: ${((parseInt(value[device]?.top, 10) * formResize?.percentHeight) / 100)}px !important;
            left: ${((parseInt(value[device]?.left, 10) * formResize?.percentWidth) / 100)}px !important;
            width: ${((value[device]?.width * formResize?.percentWidth) / 100)}px !important;
            height: ${((value[device]?.height * formResize?.percentHeight) / 100)}px !important;
          `}
        } \n`
      }
    })
    return style
  }

  const styleGroup = css`
    {
      ${renderFormStyle()}
    }
  `

  return (
    <>
      <Event.Drag
        el={el}
        disable={
        selectedElement?.id === el?.groupId
        || (el?.groupId !== '' && selectedId !== el?.id)
        || selectedElement?.formId === el?.id
        || (!editingCarosel?.value && el?.caroselId === selectedElement?.id)
        }
      >
        <div
          className={`${styles.element} ${styleGroup} ${el[device]?.hide ? 'hidden' : ''}`}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
            zIndex: el?.zIndex,
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={(e) => {
            e.stopPropagation()
            if (selectedId !== el?.id && selectedElement?.formId !== el?.id) {
              if (el?.groupId !== '') {
                if (selectedElement?.id === el?.groupId) {
                  dispatch(actionSelectId(el?.id || ''))
                } else dispatch(actionSelectId(el?.groupId || ''))
              } else if (el?.caroselId !== '') {
                if (selectedElement?.id === el?.caroselId) {
                  dispatch(actionSelectId(el?.id || ''))
                } else dispatch(actionSelectId(el?.caroselId || ''))
              } else dispatch(actionSelectId(el?.id || ''))
            }
          }}
          id={el?.id}
        >
          <div style={{
            opacity: `${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)}`,
            pointerEvents: dragging ? 'none' : 'auto',
          }}
          >
            <FormElement el={el} edit={edit} setEdit={setEdit} />
          </div>
          {hover && <div className={styles.hover} />}
          <Event.Resize el={el} onResize={onResize} width={width} height={height} />
          {!edit && <ToolbarForm el={el} />}
        </div>
      </Event.Drag>
      {selectedId === el?.id && !dragging && !resizing && <Toolbar el={el} top={top} left={left} />}
    </>
  )
}

export default Video
