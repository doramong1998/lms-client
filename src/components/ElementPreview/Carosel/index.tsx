import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import { Carousel } from 'react-bootstrap'
import Element from '..'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { CaroselProps } from '../../../utils/types/templates'

export interface Props {
    el: CaroselProps
  }

const Carosel: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const caroselElements = html?.elements?.filter((item: any) => item?.caroselId === el?.id)
  const stylesElement = css`
  top: ${el[device]?.top}px;
  left: ${el[device]?.left}px;
  width: ${el[device]?.width}px;
  height: ${el[device]?.height}px;
  z-index: ${el?.zIndex};
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

  const renderCarosel = () => {
    const data:any = {}
    for (let i = 0; i < el?.elements?.number; i++) {
      for (const item of caroselElements) {
        if (item?.[device]?.left > (i * (el?.widthElement || 0)) && item?.[device]?.left < ((i + 1) * (el?.widthElement || 0))) {
          const newItem = {
            ...item,
            [device]: {
              ...item[device],
              left: item[device]?.left - (i * (el?.widthElement || 0)),
            },
          }
          data[i] = data[i] ? [...data[i], newItem] : [newItem]
        }
      }
    }
    return Object.values(data)
  }

  return (
    <Carousel
      className={`${el?.className} ${el?.[device]?.hide ? 'hidden' : ''} ${styles.carosel} ${stylesElement} ${styles.element}`}
      nextIcon={<div className="hi-icon icon-right-arrow" style={{ color: 'darkgray', fontSize: 36 }} />}
      prevIcon={<div className="hi-icon icon-left-arrow" style={{ color: 'darkgray', fontSize: 36 }} />}
      interval={el?.timeScroll === 0 ? null : ((el?.timeScroll || 0) * 1000)}
    >
      {renderCarosel().map((data:any, index: number) => (
        <Carousel.Item key={index}>
          {data.map((item: any, idx: number) => renderElement(item, idx))}
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default Carosel
