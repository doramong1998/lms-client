import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import styles from './styles'
import FormElement from './FormElement'
import { ApplicationState } from '../../../store'
import { FormProps } from '../../../utils/types/templates'

export interface Props {
  el: FormProps
}

const Form: FunctionComponent<Props> = ({ el }) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)

  const stylesElement = css`
    top: ${el[device]?.top}px;
    left: ${el[device]?.left}px;
    width: ${el[device]?.width}px;
    height: ${el[device]?.height}px;
    z-index: ${el?.zIndex};
    opacity: ${(el?.transform?.opacity ? el?.transform?.opacity / 100 : 100)};
    transform: perspective(${el?.transform?.perspective}px) rotate(${el?.transform?.rotate}deg) rotateX(${el?.transform?.rotateX}deg) rotateY(${el?.transform?.rotateY}deg) skewX(${el?.transform?.skewX}deg) skewY(${el?.transform?.skewY}deg);
    filter: contrast(${el?.filter?.contrast}%) brightness(${el?.filter?.brightness}%) saturate(${el?.filter?.saturate}%) sepia(${el?.filter?.sepia}%) grayscale(${el?.filter?.grayscale}%) invert(${el?.filter?.invert}%) hue-rotate(${el?.filter?.hueRotate}deg) blur(${el?.filter?.blur}px);
    `

  return (
    <div
      className={`${styles.element} ${el?.[device]?.hide ? 'hidden' : ''} ${stylesElement}`}
      id={el?.id}
    >
      <div><FormElement el={el} /></div>
    </div>
  )
}

export default Form
