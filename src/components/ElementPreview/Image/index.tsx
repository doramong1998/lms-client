import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { ImageProps } from '../../../utils/types/templates'

export interface Props {
  el: ImageProps
}

const Video: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const stylesElement = css`
    top: ${el[device]?.top}px;
    left: ${el[device]?.left}px;
    width: ${el[device]?.width}px;
    height: ${el[device]?.height}px;
    z-index: ${el?.zIndex};
    opacity: ${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)};
    transform: perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg);
  `

  const stylesElementCrop = css`
    top: ${el?.crop?.top}px;
    left: ${el?.crop?.left}px;
    width: ${el?.crop?.width}px;
    height: ${el?.crop?.height}px;
  `
  const stylesBorder = css`
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
  const customClass = css`
  .${el?.className}{
    ${el?.classStyle}
  }
`
  const renderContent = () => (
    <div className={`${styles.video} ${stylesBorder} ${el?.className}`}>
      <div className={`${styles.background} ${stylesElementCrop}`} style={{ backgroundImage: `url(http://149.28.158.115:3000/media/${el?.background})` }} />
      <div className={styles.overlay} style={{ backgroundColor: el?.overlayColor }} />
    </div>
  )

  return (
    <>
      {el?.clickEventType === 'openLink' ? (
        <a href={el?.link?.url} id={el?.id} target={el?.link?.target} className={`${customClass} ${el?.[device]?.hide ? 'hidden' : ''} ${styles.element} ${stylesElement}`}>
          {renderContent()}
        </a>
      ) : (
        <div id={el?.id} className={`${customClass} ${el?.[device]?.hide ? 'hidden' : ''} ${styles.element} ${stylesElement}`}>
          {renderContent()}
        </div>
        )}
    </>
  )
}

export default Video
