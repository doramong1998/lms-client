import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import Element from '..'
import { GroupProps } from '../../../utils/types/templates'
import { ApplicationState } from '../../../store'
import styles from '../../Element/Box/styles'

export interface Props {
  el: GroupProps
}

const Group: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const html = useSelector((state: ApplicationState) => state.builder.html)
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

  return (
    <div className={`${el?.className} ${el?.[device]?.hide ? 'hidden' : ''} ${stylesElement} ${styles.element}`}>
      {html?.elements?.map((item: any, idx: number) => el?.sectionId === item?.sectionId && item?.groupId && item?.groupId === el?.id && (
        renderElement(item, idx)
      ))}
    </div>
  )
}

export default Group
