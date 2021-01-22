import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from './styles'
import { ApplicationState } from '../../../store'
import { LuckySpinProps } from '../../../utils/types/templates'
import { LuckySpin } from '../..'

export interface Props {
  el: LuckySpinProps
}

const LuckySpinPreview: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const stylesElement = css`
    top: ${el[device]?.top}px;
    left: ${el[device]?.left}px;
    width: ${el[device]?.width}px;
    height: ${el[device]?.height}px;
    z-index: ${el?.zIndex};
`

  const stylesContent = css`
    color: ${el?.color};
    font-size: ${el[device]?.fontSize}px;
    text-align: ${el[device]?.textAlign};
    font-family: ${el?.fontFamily};
    font-weight: ${el?.fontWeight};
    font-style: ${el?.fontStyle};
`
  return (
    <>
      <div id={el?.id} className={`${styles.element} ${stylesElement} ${el?.[device]?.hide ? 'hidden' : ''}`}>
        <div className={`${styles.box} ${stylesContent}`}>
          <LuckySpin el={el} />
        </div>
      </div>
    </>
  )
}

export default LuckySpinPreview
