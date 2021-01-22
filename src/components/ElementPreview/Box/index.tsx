import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import $ from 'jquery'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { BoxProps } from '../../../utils/types/templates'

export interface Props {
  el: BoxProps
}

const Box: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const html = useSelector((state: ApplicationState) => state.builder.html)

  const calcTop = (id: any) => {
    let height = 0
    for (const item of html?.sections) {
      if (item?.id !== id) {
        height += item[device]?.height
      } else {
        return height
      }
    }
    return height
  }

  const goToSection = (item: any) => {
    if (item && item !== '') {
      $('html, body').animate({ scrollTop: calcTop(html?.sections?.[item]?.id) })
    }
  }
  const stylesElement = css`
    top: ${el[device]?.top}px;
    left: ${el[device]?.left}px;
    width: ${el[device]?.width}px;
    height: ${el[device]?.height}px;
    z-index: ${el?.zIndex};
  `
  const stylesElementChild = css`
    opacity: ${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)},
    transform: perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg);
    border-top-left-radius: ${el?.borderRadius?.borderTopLeftRadius}px;
    border-top-right-radius: ${el?.borderRadius?.borderTopRightRadius}px;
    border-bottom-right-radius: ${el?.borderRadius?.borderBottomRightRadius}px;
    border-bottom-left-radius: ${el?.borderRadius?.borderBottomLeftRadius}px;
    filter: contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px);
    ${el?.borderRadius?.borderStyle !== 'none' ? `
      border-style: ${el?.borderRadius?.borderStyle};
      border-color: ${el?.borderRadius?.borderColor};
      border-width: ${el?.borderRadius?.borderWidth}px;
    ` : ''};
  `

  const setBackground = (type: any) => {
    switch (type) {
      case 'image': return {
        backgroundImage: `url("${el?.backgroundImage}")`,
        backgroundSize: el?.backgroundSize,
        backgroundAttachment: el?.backgroundAttachment,
        backgroundPosition: el?.backgroundPosition,
        backgroundRepeat: el?.backgroundRepeat,
        opacity: (el?.backgroundOpacity || 0) / 100,
      }
      case 'color': return { backgroundColor: el?.backgroundColor }
      case 'gradient': return { backgroundImage: `${el?.typeGradient}(${el?.position ? `${el?.position}deg,` : ''} ${el?.backgroundGradient1}, ${el?.backgroundGradient2})` }
      default: return {}
    }
  }

  const customClass = css`
  .${el?.className}{
    ${el?.classStyle}
  }
`

  const renderContent = () => (
    <div className={`${styles.box} ${stylesElementChild} ${el?.className}`}>
      <div className={styles.background} style={setBackground(el?.typeBackground)} />
      <div className={styles.overlay} style={{ backgroundColor: el?.overlayColor }} />
    </div>
  )

  const renderBox = () => {
    switch (el?.clickEventType) {
      case 'openLink': return (
        <a href={el?.link?.url} id={el?.id} target={el?.link?.target} className={`${el?.[device]?.hide ? 'hidden' : ''}  ${customClass} ${styles.element} ${stylesElement}`}>
          {renderContent()}
        </a>
      )
      case 'openCall': return (
        <a href={`tel:${el?.call}`} id={el?.id} target={el?.link?.target} className={`${customClass} ${el?.[device]?.hide ? 'hidden' : ''} ${styles.element} ${stylesElement}`}>
          {renderContent()}
        </a>
      )
      case 'openMail': return (
        <a href={`mailto:${el?.mail}`} id={el?.id} target={el?.link?.target} className={`${customClass} ${el?.[device]?.hide ? 'hidden' : ''} ${styles.element} ${stylesElement}`}>
          {renderContent()}
        </a>
      )
      case 'changeSection': return (
        <div id={el?.id} style={{ cursor: 'pointer' }} className={`${styles.element} ${stylesElement} ${customClass} ${el?.[device]?.hide ? 'hidden' : ''}`} onClick={() => goToSection(el?.changeSection)}>
          {renderContent()}
        </div>
      )
      default: return (
        <div id={el?.id} className={`${styles.element} ${stylesElement} ${customClass} ${el?.[device]?.hide ? 'hidden' : ''}`}>
          {renderContent()}
        </div>
      )
    }
  }

  return (
    <>
      {renderBox()}
    </>
  )
}

export default Box
