import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { VideoProps } from '../../../utils/types/templates'

export interface Props {
  el: VideoProps
}

const Video: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const stylesElement = css`
    top: ${el[device]?.top}px;
    left: ${el[device]?.left}px;
    width: ${el[device]?.width}px;
    height: ${el[device]?.height}px;
    z-index: ${el?.zIndex};
  `
  const stylesVideo = css`
  opacity: ${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)},
  transform: perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg);
  filter: contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px);
  `
  const stylesBackground = css`
    background-image: url("https://img.youtube.com/vi/${el?.videoId}/hqdefault.jpg");
  `

  const customClass = css`
  .${el?.className}{
    ${el?.classStyle}
  }
`

  return (
    <div id={el?.id} className={`${styles.element} ${el?.[device]?.hide ? 'hidden' : ''} ${stylesElement} ${customClass}`}>
      <div className={`${styles.video} ${stylesVideo} ${el?.className}`}>
        <div className={`${styles.background} ${stylesBackground}`} />
        <iframe className={styles.iframe} src={`https://www.youtube.com/embed/${el?.videoId}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="a" allowFullScreen />
      </div>
    </div>
  )
}

export default Video
