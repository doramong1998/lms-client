import React, { FunctionComponent } from 'react'
import {
  SidebarRight,
} from '..'
import './styles.scss'

export interface Props {}

const LayoutPreview: FunctionComponent<Props> = ({ children }) => (
  <>
    <SidebarRight />
    <div className="preview">
      <div className="preview__container">{children}</div>
    </div>
  </>
)

export default LayoutPreview
