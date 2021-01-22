import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import Countdown from 'react-countdown'
import moment from 'moment'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { CountdownProps } from '../../../utils/types/templates'

export interface Props {
  el: CountdownProps
}

const Button: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
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
    font-weight: ${el?.fontWeight};
  `

  const customClass = css`
  .${el?.className}{
    ${el?.classStyle}
  }
`

  const renderDate = () => {
    if (el?.countdown?.type === 'minute') {
      return Date.now() + (el?.countdown?.minute || 0) * 1000 * 60
    }
    if (el?.countdown?.type === 'everydays') {
      if (moment.duration(el?.countdown?.start).asSeconds() < moment.duration(moment().format('HH:mm:ss')).asSeconds()
    && moment.duration(el?.countdown?.stop).asSeconds() > moment.duration(moment().format('HH:mm:ss')).asSeconds()) {
        return Date.now() + (moment.duration(el?.countdown?.stop).asSeconds() - moment.duration(moment().format('HH:mm:ss')).asSeconds()) * 1000
      }
      return Date.now()
    }
    if (el?.countdown?.type === 'overtime') {
      return Date.now() + moment(el?.countdown?.end, 'YYYY-MM-DD HH:mm:ss').diff(moment(new Date()), 'seconds') * 1000
    }
  }

  const renderer = (data: any) => (
    <span>
      <span className={el?.countdown?.showDate ? '' : styles.opacity}>{data.formatted.days}</span>
      &nbsp;
      <span className={el?.countdown?.showHour ? '' : styles.opacity}>{data.formatted.hours}</span>
      &nbsp;
      <span className={el?.countdown?.showMinute ? '' : styles.opacity}>{data.formatted.minutes}</span>
      &nbsp;
      <span className={el?.countdown?.showSecond ? '' : styles.opacity}>{data.formatted.seconds}</span>
    </span>
  )

  const renderContent = () => (
    <div className={`${styles.button} ${stylesElementChild} ${el?.className}`}>
      <div className={`${styles.background} ${stylesBackground}`} />
      <div className={styles.overlay} style={{ backgroundColor: el?.overlayColor }} />
      <div className={styles.wrapContent}>
        <div className={`${styles.content} ${stylesContent}`}>
          <Countdown autoStart date={renderDate()} renderer={renderer} />
        </div>
      </div>
    </div>
  )
  return (
    <div className={`${customClass} ${el?.[device]?.hide ? 'hidden' : ''} ${styles.element} ${stylesElement}`}>
      {renderContent()}
    </div>
  )
}

export default Button
