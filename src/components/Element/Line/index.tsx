import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from './styles'
import {
  Toolbar, Event,
} from '../..'
import { actionSelectId } from '../../../store/builder/actions'
import { ApplicationState } from '../../../store'
import { LineProps } from '../../../utils/types/templates'

export interface Props {
  el: LineProps
}

const Line: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const editingCarosel = useSelector((state: ApplicationState) => state.event.editingCarosel)
  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)
  const [hover, setHover] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [direction, setDirection] = useState('')
  const [borderColor, setborderColor] = useState('')
  const [borderStyle, setborderStyle] = useState(undefined)
  const [borderWidth, setborderWidth] = useState(0)

  useEffect(() => {
    setTop(el[device]?.top || 0)
    setLeft(el[device]?.left || 0)
    setWidth(el[device]?.width || 0)
    setHeight(el[device]?.height || 0)
    setborderColor(el.borderColor || '')
    setborderStyle(el.borderStyle || undefined)
    setborderWidth(el.borderWidth || 0)
    setDirection(el.direction || '')
  }, [dispatch, el, device])

  const onResize = useCallback((
    position: { x: number; y: number },
    size: { width: number; height: number },
  ) => {
    setTop((el[device]?.top || 0) + position.y)
    setLeft((el[device]?.left || 0) + position.x)
    setWidth(direction === 'horizon' ? size.width : size.height)
    setHeight(direction === 'horizon' ? size.height : size.width)
  }, [device, el, direction])

  const customClass = css`
  .${el?.className}{
    ${el?.classStyle}
  }
`

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
          className={`${styles.element} ${el[device]?.hide ? 'hidden' : ''} ${customClass}`}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            width: direction === 'horizon' ? `${width}px` : 'auto',
            height: direction !== 'horizon' ? `${height}px` : 'auto',
            zIndex: el?.zIndex,
            padding: `${direction === 'horizon' ? '8px 0px' : '0px 8px'}`,
            border: '1px solid transparent',
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
          id={el?.id}
        >
          <div
            className={`${styles.lineLine} ${el?.className}`}
            style={{
              opacity: `${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)}`,
              transform: `perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg)`,
              filter: `contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px)`,
            }}
          >
            <div
              className={styles.border}
              style={{
                borderTopStyle: borderStyle,
                borderTopColor: borderColor,
                borderTopWidth: `${direction === 'horizon' ? `${borderWidth}px` : '0px'}`,
                borderLeftStyle: borderStyle,
                borderLeftColor: borderColor,
                borderLeftWidth: `${direction === 'vertical' ? `${borderWidth}px` : '0px'}`,
              }}
            />
          </div>
          {hover && <div className={styles.hoverLine} />}
          <Event.Resize el={el} onResize={onResize} width={width} height={el?.borderWidth} />
        </div>
      </Event.Drag>
      {selectedId === el?.id && !dragging && !resizing && <Toolbar el={el} top={top} left={left} />}
    </>
  )
}

export default Line
