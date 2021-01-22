import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import Desktop from './Desktop'
import Mobile from './Mobile'

export interface Props { }

const Device: FunctionComponent<Props> = () => {
  const device = useSelector((state: ApplicationState) => state.sidebarRight.device)
  return (
    <>
      {device === 'desktop' ? <Mobile /> : <Desktop />}
    </>
  )
}

export default Device
