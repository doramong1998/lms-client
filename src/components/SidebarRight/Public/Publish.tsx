import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { ApplicationState } from '../../../store'
import { actionPublishLdp } from '../../../store/sidebarRight/actions'
import { actionSaveLDP } from '../../../store/api/actions'

export interface Props {
  openModal: () => void
}

const Publish: FunctionComponent<Props> = ({ openModal }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const newLDPName = useSelector((state: ApplicationState) => state.api.newLDPName)
  const publishLdp = () => {
    const id = location?.pathname.indexOf('/builder') !== -1 ? location?.pathname.replace('/builder/', '') : ''
    dispatch(actionSaveLDP('publish', { id, data: { title: newLDPName, data: JSON.stringify(html) } }))
    dispatch(actionPublishLdp({ data: html }))
    openModal()
  }

  return (
    <>
      <Button variant="outline-primary" onClick={publishLdp}>
        <i className="hi-icon icon-publish" />
        {' '}
        Xuất bản
      </Button>
    </>
  )
}

export default Publish
