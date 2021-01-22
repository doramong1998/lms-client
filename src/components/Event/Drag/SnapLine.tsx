import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import { ApplicationState } from '../../../store'
import { common } from '../../../utils'

export interface Props {
  el: any
  snap: any
}

const Drag: FunctionComponent<Props> = ({
  el, snap,
}) => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  const snapElememnt = useSelector((state: ApplicationState) => state.event.snapElememnt)
  const html = useSelector((state: ApplicationState) => state.builder.html)

  const styleBorder = css`
  ${`transform: translate(${snap ? snap.x : 0}px, ${snap ? snap.y : 0}px) !important;`}
  `
  const styleLineTop = css`
    border: 1px dashed var(--primary);
    position: fixed;
    top: ${el?.[device]?.top}px;
    width: 300vw;
    left: -100vw;
    z-index: 1000;
  `
  const styleLineBottom = css`
    border: 1px dashed var(--primary);
    position: fixed;
    top: ${el?.[device]?.top + el?.[device]?.height}px;
    width: 300vw;
    left: -100vw;
    z-index: 1000;
  `
  const styleLineLeft = css`
    border: 1px dashed var(--primary);
    position: fixed;
    left: ${((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) + el?.[device]?.left}px;
    height: 300vh;
    top: -100vh;
    z-index: 1000;
  `

  const styleLineRight = css`
    border: 1px dashed var(--primary);
    position: fixed;
    left: ${((window.innerWidth - (common.CalcWidth(device, html))) / 2 - 4) + el?.[device]?.left + el?.[device]?.width}px;
    height: 300vh;
    top: -100vh;
    z-index: 1000;
  `

  return (
    <>
      {snapElememnt && snapElememnt.top && <div className={`${styleLineTop} ${styleBorder}`} />}
      {snapElememnt && snapElememnt.bottom && <div className={`${styleLineBottom} ${styleBorder}`} />}
      {snapElememnt && snapElememnt.left && <div className={`${styleLineLeft} ${styleBorder}`} />}
      {snapElememnt && snapElememnt.right && <div className={`${styleLineRight} ${styleBorder}`} />}
    </>

  )
}

export default Drag
