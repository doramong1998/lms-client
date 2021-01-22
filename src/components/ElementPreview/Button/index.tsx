import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import $ from 'jquery'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { ButtonProps } from '../../../utils/types/templates'

export interface Props {
  el: ButtonProps
}

const Button: FunctionComponent<Props> = ({ el }) => {
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
    box-shadow: ${el?.boxShadow !== 'none' ? `${el?.boxShadowWidth}px ${el?.boxShadowHeight}px ${el?.boxShadowOpacity}px ${el?.boxShadowDark} ${el?.boxShadow}` : ''};
    opacity: ${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)};
    transform: perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg);
    `
  const stylesElementChild = css`
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

  const stylesBackground = css`
    ${el?.typeBackground === 'color' ? `background: ${el?.backgroundColor};`
    : `background-image: ${el?.typeGradient}(${el?.position ? `${el?.position}deg,` : ''} ${el?.backgroundGradient1}, ${el?.backgroundGradient2})`}
  `
  const stylesContent = css`
    color: ${el?.color};
    font-size: ${el[device]?.fontSize}px;
    text-align: ${el[device]?.textAlign};
    font-family: ${el?.fontFamily};
  `

  const customClass = css`
  .${el?.className}{
    ${el?.classStyle}
  }
`

  const renderContent = () => (
    <div className={`${styles.button} ${stylesElementChild} ${el?.className}`}>
      <div className={`${styles.background} ${stylesBackground}`} />
      <div className={styles.overlay} style={{ backgroundColor: el?.overlayColor }} />
      <div className={styles.wrapContent}>
        <div className={`${styles.content} ${stylesContent}`}>
          <div className={styles.noMargin} dangerouslySetInnerHTML={{ __html: el?.text ? el?.text : '' }} />
        </div>
      </div>
    </div>
  )

  const renderButton = () => {
    switch (el?.clickEventType) {
      case 'openLink': return (
        <a href={el?.link?.url} id={el?.id} target={el?.link?.target} className={`${customClass} ${el?.[device]?.hide ? 'hidden' : ''} ${styles.element} ${stylesElement}`}>
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
      {renderButton()}
    </>
  )
}

export default Button
