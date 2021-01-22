import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from '../styles'
import { ApplicationState } from '../../../../store'
import { ButtonProps } from '../../../../utils/types/templates'

export interface Props {
  item: ButtonProps
  onClick?: any
}

const Button: FunctionComponent<Props> = ({ item, onClick }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const stylesElement = css`
    top: ${item[device]?.top}px;
    left: ${item[device]?.left}px;
    width: ${item[device]?.width}px;
    height: ${item[device]?.height}px;
    z-index: ${item?.zIndex};
    box-shadow: ${item?.boxShadow !== 'none' ? `${item?.boxShadowWidth}px ${item?.boxShadowHeight}px ${item?.boxShadowOpacity}px ${item?.boxShadowDark} ${item?.boxShadow}` : ''};
    cursor: pointer;
    &:active {
      transform: translateY(3px);
    }
  `
  const stylesElementChild = css`
    opacity: ${(item?.transform?.opacity ? item?.transform?.opacity / 100 : 100)};
    transform: perspective(${item?.transform?.perspective}px) rotate(${item?.transform?.rotate}deg) rotateX(${item?.transform?.rotateX}deg) rotateY(${item?.transform?.rotateY}deg) skewX(${item?.transform?.skewX}deg) skewY(${item?.transform?.skewY}deg);
    border-top-left-radius: ${item?.borderRadius?.borderTopLeftRadius}px;
    border-top-right-radius: ${item?.borderRadius?.borderTopRightRadius}px;
    border-bottom-right-radius: ${item?.borderRadius?.borderBottomRightRadius}px;
    border-bottom-left-radius: ${item?.borderRadius?.borderBottomLeftRadius}px;
    filter: contrast(${item?.filter?.contrast}%) brightness(${item?.filter?.brightness}%) saturate(${item?.filter?.saturate}%) sepia(${item?.filter?.sepia}%) grayscale(${item?.filter?.grayscale}%) invert(${item?.filter?.invert}%) hue-rotate(${item?.filter?.hueRotate}deg) blur(${item?.filter?.blur}px);
    ${item?.borderRadius?.borderStyle !== 'none' ? `
      border-style: ${item?.borderRadius?.borderStyle};
      border-color: ${item?.borderRadius?.borderColor};
      border-width: ${item?.borderRadius?.borderWidth}px;
    ` : ''};
  `

  const stylesBackground = css`
    ${item?.typeBackground === 'color' ? `background: ${item?.backgroundColor};`
    : `background-image: ${item?.typeGradient}(${item?.position ? `${item?.position}deg,` : ''} ${item?.backgroundGradient1}, ${item?.backgroundGradient2})`}
  `
  const stylesContent = css`
    color: ${item?.color};
    text-align: center;
  `

  const renderContent = () => (
    <div className={`${styles.button} ${stylesElementChild}`}>
      <div className={`${styles.background} ${stylesBackground}`} />
      <div className={styles.overlay} />
      <div className={styles.wrapContent}>
        <div className={`${styles.content} ${stylesContent}`}>
          <div className={styles.noMargin} dangerouslySetInnerHTML={{ __html: item?.text ? item?.text : '' }} />
        </div>
      </div>
    </div>
  )

  return (
    <div id={item?.id} className={`${styles.element} ${item?.[device]?.hide ? 'hidden' : ''} ${stylesElement}`} onClick={onClick}>
      {renderContent()}
    </div>
  )
}

export default Button
