import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from './styles'
import {
  Toolbar, Event,
} from '../..'
import { ApplicationState } from '../../../store'
import { actionSelectId } from '../../../store/builder/actions'
import { BoxProps } from '../../../utils/types/templates'

export interface Props {
  el: BoxProps
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
  const [borderRadius, setBorderRadius] = useState<any>(null)

  useEffect(() => {
    setTop(el[device]?.top || 0)
    setLeft(el[device]?.left || 0)
    setWidth(el[device]?.width || 0)
    setHeight(el[device]?.height || 0)
    setBorderRadius(el?.borderRadius || null)
  }, [dispatch, el, device])

  const onResize = useCallback((position: { x: number; y: number }, size: { width: number, height: number }) => {
    setTop((el[device]?.top || 0) + position.y)
    setLeft((el[device]?.left || 0) + position.x)
    setWidth(size.width)
    setHeight(size.height)
  }, [device, el])

  const setBackground = (type: any) => {
    switch (type) {
      case 'color': return { background: el?.backgroundColor }
      case 'image': return {
        backgroundImage: `url("${el?.backgroundImage}")`,
        backgroundSize: el?.backgroundSize,
        backgroundAttachment: el?.backgroundAttachment,
        backgroundPosition: el?.backgroundPosition,
        backgroundRepeat: el?.backgroundRepeat,
        opacity: (el?.backgroundOpacity || 0) / 100,
      }
      case 'gradient': return { backgroundImage: `${el?.typeGradient}(${el?.position ? `${el?.position}deg,` : ''} ${el?.backgroundGradient1}, ${el?.backgroundGradient2})` }
      default: return {}
    }
  }

  const styleBorder = css`
    border-top-left-radius: ${borderRadius?.borderTopLeftRadius}px;
    border-top-right-radius: ${borderRadius?.borderTopRightRadius}px;
    border-bottom-right-radius: ${borderRadius?.borderBottomRightRadius}px;
    border-bottom-left-radius: ${borderRadius?.borderBottomLeftRadius}px;

    ${borderRadius && borderRadius?.borderStyle !== 'none' ? `
      border-style: ${borderRadius?.borderStyle};
      border-color: ${borderRadius?.borderColor};
      border-width: ${borderRadius?.borderWidth}px;
    ` : ''}
  `

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
            width: `${width}px`,
            height: `${height}px`,
            zIndex: el?.zIndex,
            boxShadow: el?.boxShadow !== 'none' ? `${el?.boxShadowWidth}px ${el?.boxShadowHeight}px ${el?.boxShadowOpacity}px ${el?.boxShadowDark} ${el?.boxShadow}` : '',
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
            className={`${styles.box} ${styleBorder} ${el?.className}`}
            id={el?.id}
            style={{
              opacity: `${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)}`,
              transform: `perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg)`,
              filter: `contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px)`,
            }}
          >
            <div className={styles.background} style={setBackground(el?.typeBackground)} />
            <div className={styles.overlay} style={{ backgroundColor: el?.overlayColor }} />
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
