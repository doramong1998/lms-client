import React, {
  FunctionComponent, useState,
} from 'react'
import { useSelector } from 'react-redux'
import { css } from 'emotion'
import { Button } from 'react-bootstrap'
import {
  Grid, SidebarLeft, SidebarRight, ToolbarSection, Window, ToolbarHorizon, Modal,
} from '..'
import './styles.scss'
import { ApplicationState } from '../../store'

export interface Props {}

const Mainlayout: FunctionComponent<Props> = ({ children }) => {
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const listGroup = useSelector((state: ApplicationState) => state.builder.listGroup)
  const groupDrag = useSelector((state: ApplicationState) => state.event.groupDrag)
  const [visibleModal, setVisibleModal] = useState(false)

  const renderStyle = () => {
    let style = ''
    listGroup?.forEach((value: any) => {
      style += `
        #${value} {
          border: 1px dashed var(--primary) !important;
          box-sizing: border-box !important;
          transform: translate(${groupDrag?.x}px, ${groupDrag?.y}px) !important;
          pointer-events: none;
        } \n
      `
    })
    return style
  }

  const styleGroup = css`
    {
      ${renderStyle()}
    }
  `
  const renderEditor = () => {
    if (html?.sections?.length > 0) {
      return (
        <div className={`editor ${styleGroup}`}>
          <div className="editor__container">{children}</div>
        </div>
      )
    }

    return (
      <Button className="button-add-section d-flex align-items-center justify-content-center" variant="outline-primary" onClick={() => setVisibleModal(true)}>
        <i className="hi-icon icon-c-add" />
        <span>Thêm Section</span>
      </Button>
    )
  }

  return (
    <>
      <SidebarLeft />
      <Grid />
      <SidebarRight />
      <ToolbarSection />
      <ToolbarHorizon />
      {renderEditor()}
      <Modal.Sections visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
      <Window />
    </>
  )
}

export default Mainlayout
