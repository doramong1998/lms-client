import React, {
  FunctionComponent,
} from 'react'
import { Element } from '../../../components'

export interface Props {
  el: any
}

const ItemElement: FunctionComponent<Props> = ({ el }) => {
  const renderElement = (el: any) => {
    switch (el.type) {
      case 'button':
        return (
          <Element.Button el={el} />
        )
      case 'carosel':
        return (
          <Element.Carosel el={el} />
        )
      case 'heading':
        return (
          <Element.Heading el={el} />
        )
      case 'line':
        return (
          <Element.Line el={el} />
        )
      case 'paragraph':
        return (
          <Element.Paragraph el={el} />
        )
      case 'list':
        return (
          <Element.List el={el} />
        )
      case 'video':
        return (
          <Element.Video el={el} />
        )
      case 'image':
        return (
          <Element.Image el={el} />
        )
      case 'form':
        return (
          <Element.Form el={el} />
        )
      case 'shape':
        return (
          <Element.Shape el={el} />
        )
      case 'box':
        return (
          <Element.Box el={el} />
        )
      case 'codeHtml':
        return (
          <Element.CodeHtml el={el} />
        )
      case 'group':
        return (
          <Element.Group el={el} />
        )
      case 'gallery':
        return (
          <Element.Gallery el={el} />
        )
      case 'countdown':
        return (
          <Element.Countdown el={el} />
        )
      case 'luckySpin':
        return (
          <Element.LuckySpin el={el} />
        )
      default:
        return null
    }
  }

  return (
    <>
      {renderElement(el)}
    </>
  )
}

export default ItemElement
