import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { ShapeProps } from '../../../utils/types/templates'

export interface Props {
  el: ShapeProps
}

const Shape: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const stylesElement = css`
    top: ${el[device]?.top}px;
    left: ${el[device]?.left}px;
    width: ${el[device]?.width}px;
    height: ${el[device]?.height}px;
    z-index: ${el?.zIndex};
    box-shadow: ${el?.boxShadow !== 'none' ? `${el?.boxShadowWidth}px ${el?.boxShadowHeight}px ${el?.boxShadowOpacity}px ${el?.boxShadowDark} ${el?.boxShadow}` : ''}
  `
  const customClass = css`
  .${el?.className}{
    ${el?.classStyle}
  }
`
  const icon: any = el?.icon?.split(' ')

  return (
    <div id={el?.id} className={`${styles.element} ${el?.[device]?.hide ? 'hidden' : ''} ${stylesElement} ${customClass}`}>
      <div
        className={`${styles.icon} ${css`svg {color: ${el?.color}}`} ${el?.className}`}
        style={{
          opacity: `${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)}`,
          transform: `perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg)`,
          filter: `contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px)`,
        }}
      >
        {el?.icon && <FontAwesomeIcon icon={[icon[0], icon[1]]} />}
      </div>
    </div>
  )
}

export default Shape
