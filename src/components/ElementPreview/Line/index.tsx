import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { LineProps } from '../../../utils/types/templates'

export interface Props {
  el: LineProps
}

const Line: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const stylesElement = css`
    top: ${el[device]?.top}px;
    left: ${el[device]?.left}px;
    width: ${el?.direction === 'horizon' ? `${el[device]?.width}px` : 'auto'};
    height: ${el?.direction === 'horizon' ? `${el[device]?.height}px` : 'auto'};
    z-index: ${el?.zIndex};
    padding: ${el?.direction === 'horizon' ? '8px 0px' : '0px 8px'};
  `
  const stylesBorder = css`
    border-top-style: ${el?.borderStyle};
    border-top-color: ${el?.borderColor};
    border-top-width: ${el?.direction === 'horizon' ? `${el?.borderWidth}px` : '0px'};
    border-left-style: ${el?.borderStyle};
    border-left-color: ${el?.borderColor};
    border-left-width: ${el?.direction === 'vertical' ? `${el?.borderWidth}px` : '0px'};
  `

  const customClass = css`
  .${el?.className}{
    ${el?.classStyle}
  }
`

  return (
    <div id={el?.id} className={`${styles.element} ${el?.[device]?.hide ? 'hidden' : ''} ${stylesElement} ${customClass}`}>
      <div
        className={`${styles.lineLine} ${el?.className}`}
        style={{
          opacity: `${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)}`,
          transform: `perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg)`,
          filter: `contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px)`,
        }}
      >
        <div
          className={`${styles.border} ${stylesBorder} `}
        />
      </div>
    </div>
  )
}

export default Line
