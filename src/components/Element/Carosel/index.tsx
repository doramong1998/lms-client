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
import { actionSelectId } from '../../../store/builder/actions'
import { ApplicationState } from '../../../store'
import { CaroselProps } from '../../../utils/types/templates'
import ToolbarCarosel from '../../ToolbarCarosel'

export interface Props {
    el: CaroselProps
  }

const Carosel: FunctionComponent<Props> = ({ el }) => {
  const dispatch = useDispatch()

  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const dragging = useSelector((state: ApplicationState) => state.event.dragging)
  const resizing = useSelector((state: ApplicationState) => state.event.resizing)
  const editingCarosel = useSelector((state: ApplicationState) => state.event.editingCarosel)
  const selectedId = useSelector((state: ApplicationState) => state.builder.selectedId)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const selectedElement = html?.elements?.find((item: any) => item?.id === selectedId)
  const [hover, setHover] = useState(false)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [width, setWidth] = useState(0)
  const [widthElement, setWidthElement] = useState(0)
  const [height, setHeight] = useState(0)
  const [part, setPart] = useState(0)

  useEffect(() => {
    setTop(el[device]?.top || 0)
    setLeft(el[device]?.left || 0)
    setWidth(el[device]?.width || 0)
    setHeight(el[device]?.height || 0)
    setWidthElement(el?.widthElement || 0)
  }, [dispatch, el, device])

  const onResize = useCallback((position: { x: number; y: number }, size: { width: number, height: number }) => {
    setTop((el[device]?.top || 0) + position.y)
    setLeft((el[device]?.left || 0) + position.x)
    setWidth(size.width)
    setHeight(size.height)
  }, [device, el])

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

  const caroselContent = css`
      &:before{
        content: '';
        position: absolute;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
      }
    `

  return (
    <>
      <Event.Drag el={el} disable={selectedElement?.id === el?.groupId || (el?.groupId !== '' && selectedId !== el?.id) || editingCarosel?.value}>
        <div
          className={`${styles.element} ${el[device]?.hide ? 'hidden' : ''} ${customClass}`}
          style={{
            top: `${top}px`,
            left: editingCarosel?.value ? `${left - (el?.widthElement || 0) * part}px` : `${left}px`,
            width: 'auto',
            height: `${height}px`,
            zIndex: el?.zIndex,
            border: editingCarosel?.value ? 'none' : '0.5px solid black',
            backgroundColor: editingCarosel?.value ? 'white' : 'none',
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={(e) => {
            e.stopPropagation()
            if (el?.groupId !== '') {
              if (selectedElement?.id === el?.groupId) {
                dispatch(actionSelectId(el?.id || ''))
              } else dispatch(actionSelectId(el?.groupId || ''))
            } else {
              dispatch(actionSelectId(el?.id || ''))
            }
          }}
          id={el?.id}
        >
          <div
            className={`${el?.className} ${styles.carosel}`}
            style={{
              border: editingCarosel?.value ? '1px solid #000' : 0,
              width: editingCarosel?.value ? `${widthElement * el?.elements?.number}px` : `${width}px`,
              height,
              position: 'relative',
              backgroundSize: `${widthElement}px`,
              backgroundImage: 'url("data:image/svg+xml;utf8, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22420%22%20height%3D%22250%22%20viewBox%3D%220%200%20420%20250%22%3E%3Cline%20fill%3D%22none%22%20stroke-width%3D%222%22%20stroke%3D%22rgb(0%2C0%2C0)%22%20x1%3D%22420%22%20y1%3D%220%22%20x2%3D%22420%22%20y2%3D%22250%22%20%2F%3E%3C%2Fsvg%3E")',

            }}
          >
            <div className={caroselContent} />
            {html?.elements?.map((item: any, idx: number) => el?.sectionId === item?.sectionId && item?.caroselId && item?.caroselId === el?.id && (
              renderElement(item, idx)
            ))}
          </div>
          {hover && <div className={styles.hover} />}
          <Event.Resize el={el} onResize={onResize} width={width} height={height} editingCarosel={editingCarosel} />
        </div>
      </Event.Drag>
      {selectedId === el?.id && !dragging && !resizing && !editingCarosel?.value && <Toolbar el={el} top={top} left={left} />}
      {selectedId === el?.id && editingCarosel?.value && <ToolbarCarosel el={el} top={top} left={left} part={part} setPart={setPart} />}
    </>
  )
}

export default Carosel
