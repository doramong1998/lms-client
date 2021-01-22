import React, { FunctionComponent } from 'react'
import { css } from 'emotion'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { HeadingProps } from '../../../utils/types/templates'

export interface Props {
  el: HeadingProps
}

const Heading: FunctionComponent<Props> = ({ el }) => {
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
    z-index: ${el?.zIndex};
  `
  const stylesContent = css`
    color: ${el?.color};
    font-size: ${el[device]?.fontSize}px;
    text-align: ${el[device]?.textAlign};
    font-weight: ${el?.fontWeight};
    font-style: ${el?.fontStyle};
    text-decoration-line: ${el?.textDecorationLine};
    text-transform: ${el?.textTransform};
    font-family: ${el?.fontFamily};
    opacity: ${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)},
    transform: perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg);
    filter: contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px);
    `
  const customClass = css`
    .${el?.className}{
      ${el?.classStyle}
    }
  `
  const renderTag = () => {
    const className = {
      className: `${styles.content} ${stylesContent} ${el?.className}`,
    }
    switch (el?.tag) {
      case 'h1':
        return (
          <h1 {...className}>
            <div className={styles.noMargin} dangerouslySetInnerHTML={{ __html: el?.text ? el?.text : '' }} />
          </h1>
        )
      case 'h2':
        return (
          <h2 {...className}>
            <div className={styles.noMargin} dangerouslySetInnerHTML={{ __html: el?.text ? el?.text : '' }} />
          </h2>
        )
      case 'h3':
        return (
          <h3 {...className}>
            <div className={styles.noMargin} dangerouslySetInnerHTML={{ __html: el?.text ? el?.text : '' }} />
          </h3>
        )
      case 'h4':
        return (
          <h4 {...className}>
            <div className={styles.noMargin} dangerouslySetInnerHTML={{ __html: el?.text ? el?.text : '' }} />
          </h4>
        )
      case 'h5':
        return (
          <h5 {...className}>
            <div className={styles.noMargin} dangerouslySetInnerHTML={{ __html: el?.text ? el?.text : '' }} />
          </h5>
        )
      case 'h6':
        return (
          <h6 {...className}>
            <div className={styles.noMargin} dangerouslySetInnerHTML={{ __html: el?.text ? el?.text : '' }} />
          </h6>
        )
      default:
        return null
    }
  }

  const renderHeading = () => {
    switch (el?.clickEventType) {
      case 'openLink': return (
        <a href={el?.link?.url} id={el?.id} target={el?.link?.target} className={`${customClass} ${el?.[device]?.hide ? 'hidden' : ''} ${styles.element} ${stylesElement}`}>
          {renderTag()}
        </a>
      )
      case 'openCall': return (
        <a href={`tel:${el?.call}`} id={el?.id} target={el?.link?.target} className={`${customClass} ${el?.[device]?.hide ? 'hidden' : ''} ${styles.element} ${stylesElement}`}>
          {renderTag()}
        </a>
      )
      case 'openMail': return (
        <a href={`mailto:${el?.mail}`} id={el?.id} target={el?.link?.target} className={`${customClass} ${el?.[device]?.hide ? 'hidden' : ''} ${styles.element} ${stylesElement}`}>
          {renderTag()}
        </a>
      )
      case 'changeSection': return (
        <div id={el?.id} style={{ cursor: 'pointer' }} className={`${styles.element} ${stylesElement} ${customClass} ${el?.[device]?.hide ? 'hidden' : ''}`} onClick={() => goToSection(el?.changeSection)}>
          {renderTag()}
        </div>
      )
      default: return (
        <div id={el?.id} className={`${styles.element} ${stylesElement} ${customClass} ${el?.[device]?.hide ? 'hidden' : ''}`}>
          {renderTag()}
        </div>
      )
    }
  }

  return (
    <>
      {renderHeading()}
    </>
  )
}

export default Heading
