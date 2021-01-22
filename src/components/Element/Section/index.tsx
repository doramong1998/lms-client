import React, { FunctionComponent, useCallback } from 'react'
import { css } from 'emotion'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { actionSelectSection } from '../../../store/builder/actions'
import { SectionProps } from '../../../utils/types/templates'
import { common } from '../../../utils'

export interface Props {
  el: SectionProps
}

const Section: FunctionComponent<Props> = ({
  el, children,
}) => {
  const dispatch = useDispatch()

  const html = useSelector((state: ApplicationState) => state.builder.html)
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const updateMousePosition = useCallback((e: any) => {
    let height = 0
    for (const item of html?.sections) {
      if (height < e.pageY && e.pageY < item[device]?.height + height) {
        dispatch(actionSelectSection({ visible: true, sectionId: item.id, height: e.pageY }))
        height += item[device]?.height
      } else height += item[device]?.height
    }
  }, [dispatch, html, device])

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
    <div
      id={el?.id}
      onClick={(e) => updateMousePosition(e)}
      className={`
        ${styles.section}
        ${css`border-bottom: 1px dashed var(--primary);`}
        ${customClass}
      `}
      style={{ height: `${el[device]?.height}px`, width: `${device === 'mobile' ? `${common.CalcWidth(device, html)}px` : '100%'}` }}
    >
      <div
        className={`${styles.background} ${el?.className}`}
        style={{ ...setBackground(el?.typeBackground), filter: `contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px)` }}
      />
      <div className={styles.overlay} style={{ backgroundColor: el?.overlayColor }} />
      {el[device]?.hide && (
        <div className={styles.hidden} />
      )}
      <div className={container}>
        {children}
      </div>
    </div>
  )
}

export default Section
