import { css } from 'emotion'
import React, { FunctionComponent, memo } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../store'
import './styles.scss'
import { common } from '../../utils'

export interface Props {}

const Grid: FunctionComponent<Props> = () => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const grid = css`
    border-left: 1px dashed var(--primary);
    position: fixed;
    height: 100%;
    z-index: 1000;
  
    &.grid--left {
      left: calc(((100vw - ${common.CalcWidth(device, html)}px) / 2) - 3px);
    }
  
    &.grid--right {
      right: calc(((100vw - ${common.CalcWidth(device, html)}px) / 2) - 3px);
    }
  `

  return (
    <>
      <div className={`${grid} grid--left`} />
      <div className={`${grid} grid--right`} />
    </>
  )
}

export default memo(Grid)
