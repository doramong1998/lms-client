import React, {
  FunctionComponent, useCallback, useEffect, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'emotion'
import Element from '..'
import styles from './styles'
import {
  Toolbar, Event,
} from '../..'
import { ApplicationState } from '../../../store'
import { actionSelectId } from '../../../store/builder/actions'
import { GroupProps } from '../../../utils/types/templates'

export interface Props {
  el: GroupProps
}

const Group: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const groupResize = useSelector((state: ApplicationState) => state.event.groupResize)
  const editingCarosel = useSelector((state: ApplicationState) => state.event.editingCarosel)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)

  const [hover, setHover] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)

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
    setHeight(size.height)
  }, [device, el])

  const renderStyle = () => {
    let style = ''
    el?.element?.forEach((value: any) => {
      const element = html?.elements?.find((item: any) => item?.id === value)
      style += `#${value} {
        ${groupResize && resizing && `
          top: ${((parseInt(element[device]?.top, 10) * groupResize?.percentHeight) / 100)}px !important;
          left: ${((parseInt(element[device]?.left, 10) * groupResize?.percentWidth) / 100)}px !important;
          width: ${((element[device]?.width * groupResize?.percentWidth) / 100)}px !important;
          height: ${((element[device]?.height * groupResize?.percentHeight) / 100)}px !important;
        `}
      } \n`
    })
    return style
  }
  const styleGroup = css`
    {
      ${renderStyle()}
    }
  `

  const customClass = css`
    .${el?.className}{
      ${el?.classStyle}
    }
  `

  const renderElement = (el: any, idx: number) => {
    switch (el.type) {
      case 'button':
        return (
          <Element.Button key={idx} el={el} />
        )
      case 'heading':
        return (
          <Element.Heading key={idx} el={el} />
        )
      case 'line':
        return (
          <Element.Line key={idx} el={el} />
        )
      case 'paragraph':
        return (
          <Element.Paragraph key={idx} el={el} />
        )
      case 'list':
        return (
          <Element.List key={idx} el={el} />
        )
      case 'video':
        return (
          <Element.Video key={idx} el={el} />
        )
      case 'image':
        return (
          <Element.Image key={idx} el={el} />
        )
      case 'form':
        return (
          <Element.Form key={idx} el={el} />
        )
      case 'shape':
        return (
          <Element.Shape key={idx} el={el} />
        )
      case 'box':
        return (
          <Element.Box key={idx} el={el} />
        )
      case 'group':
        return (
          <Element.Group key={idx} el={el} />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Event.Drag
        el={el}
        disable={
        selectedElement?.groupId === el?.id
        || (el?.groupId !== '' && selectedId !== el?.id)
        || (!editingCarosel?.value && el?.caroselId === selectedElement?.id)
        }
      >
        <div
          className={`${styles.element} ${customClass}`}
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
          id={el?.id}
        >
          <div className={`${styleGroup} ${el?.className}`} style={{ pointerEvents: dragging ? 'none' : 'auto' }}>
            {html?.elements?.map((item: any, idx: number) => el?.sectionId === item?.sectionId && item?.groupId && item?.groupId === el?.id && (
              renderElement(item, idx)
            ))}
          </div>
          {hover && <div className={styles.hover} />}
          <Event.Resize el={el} onResize={onResize} width={width} height={height} />
        </div>
      </Event.Drag>
      {selectedId === el?.id && !dragging && !resizing && <Toolbar el={el} top={top} left={left} />}
    </>
  )
}

export default Group
