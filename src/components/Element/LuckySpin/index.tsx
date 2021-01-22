import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import {
  Toolbar, Event,
  LuckySpin,
} from '../..'
import { ApplicationState } from '../../../store'
import { actionSelectId } from '../../../store/builder/actions'
import { LuckySpinProps } from '../../../utils/types/templates'

export interface Props {
  el: LuckySpinProps
}

const Box: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)
  const editingCarosel = useSelector((state: ApplicationState) => state.event.editingCarosel)
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
  }, [dispatch, el, device])

  const onResize = useCallback((position: { x: number; y: number }, size: { width: number, height: number }) => {
    setTop((el[device]?.top || 0) + position.y)
    setLeft((el[device]?.left || 0) + position.x)
    setWidth(size.width)
    setHeight(size.width)
  }, [device, el])

  return (
    <>
      <Event.Drag
        el={el}
        disable={
        selectedElement?.id === el?.groupId
        || (el?.groupId !== '' && selectedId !== el?.id)
        || (!editingCarosel?.value && el?.caroselId === selectedElement?.id)
      }
      >
        <div
          className={`${styles.element} ${el[device]?.hide ? 'hidden' : ''}`}
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
            if (el?.groupId !== '') {
              if (selectedElement?.id === el?.groupId) {
                dispatch(actionSelectId(el?.id || ''))
              } else dispatch(actionSelectId(el?.groupId || ''))
            } else if (el?.caroselId !== '') {
              if (selectedElement?.id === el?.caroselId) {
                dispatch(actionSelectId(el?.id || ''))
              } else dispatch(actionSelectId(el?.caroselId || ''))
            } else {
              dispatch(actionSelectId(el?.id || ''))
            }
          }}
        >
          <div
            className={`${styles.box}`}
            style={{
              color: el?.color,
              fontSize: el[device]?.fontSize,
              fontFamily: el?.fontFamily,
              textAlign: el[device]?.textAlign,
              fontWeight: el?.fontWeight,
              fontStyle: el?.fontStyle,
            }}
            id={el?.id}
          >
            <LuckySpin el={el} />
          </div>
          {hover && <div className={styles.hover} />}
          <Event.Resize el={el} onResize={onResize} width={width} height={height} />
        </div>
      </Event.Drag>
      {selectedId === el?.id && !dragging && !resizing && <Toolbar el={el} top={top} left={left} />}
    </>
  )
}

export default Box
