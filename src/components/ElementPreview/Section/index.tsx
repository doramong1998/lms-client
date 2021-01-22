import React, { FunctionComponent } from 'react'
import { css } from 'emotion'
import { useSelector } from 'react-redux'
import styles from './styles'
import { SectionProps } from '../../../utils/types/templates'
import { ApplicationState } from '../../../store'
import { common } from '../../../utils'

export interface Props {
  el: SectionProps
}

const Section: FunctionComponent<Props> = ({
  el, children,
}) => {
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const stylesSection = css`
    height: ${el[device]?.height}px;
    filter: contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px);
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
  const container = css`
    width: ${common.CalcWidth(device, html)}px;
    position: relative;
    margin: 0 auto;
    height: 100%;
`

  const customClass = css`
    .${el?.className}{
      ${el?.classStyle}
    }
  `

  return (
    <div id={el?.id} className={`${styles.section} ${el?.[device]?.hide ? 'hidden' : ''} ${stylesSection} ${customClass}`}>
      <div
        className={`${styles.background} ${el?.className}`}
        style={setBackground(el?.typeBackground)}
      />
      <div className={styles.overlay} style={{ backgroundColor: el?.overlayColor }} />
      <div className={container}>
        {children}
      </div>
    </div>
  )
}

export default Section
