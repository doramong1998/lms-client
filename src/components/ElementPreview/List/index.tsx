import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { ParagraphProps } from '../../../utils/types/templates'

export interface Props {
  el: ParagraphProps
}

const Paragraph: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const stylesElement = css`
    top: ${el[device]?.top}px;
    left: ${el[device]?.left}px;
    width: ${el[device]?.width}px;
    z-index: ${el?.zIndex};
  `

  const stylesContent = css`
    opacity: ${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)},
    transform: perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg);
    color: ${el?.color};
    font-family: ${el?.fontFamily};
    font-size: ${el[device]?.fontSize}px !important;
    text-align: ${el[device]?.textAlign};
    font-weight: ${el.fontWeight} !important;
    font-style: ${el.fontStyle} !important;
    text-decoration-line: ${el.textDecorationLine} !important;
    text-transform: ${el.textTransform} !important;
    filter: contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px);
  `
  const customClass = css`
  .${el?.className}{
    ${el?.classStyle}
  }
`
  return (
    <div id={el?.id} className={`${styles.element} ${el?.[device]?.hide ? 'hidden' : ''} ${stylesElement} ${customClass}`}>
      <div className={`${styles.content} ${stylesContent} ${el?.className}`}>
        <div className={styles.noMargin} dangerouslySetInnerHTML={{ __html: el?.text ? el?.text : '' }} />
      </div>
    </div>
  )
}

export default Paragraph
