import React, { FunctionComponent } from 'react'
import {
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { ApplicationState } from '../../../store'
import { actionSaveLDP } from '../../../store/api/actions'

export interface Props { }

const Save: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const html = useSelector((state: ApplicationState) => state.builder.html)
  const newLDPName = useSelector((state: ApplicationState) => state.api.newLDPName)

  const saveLdp = () => {
    const id = history?.location?.pathname.indexOf('/builder') !== -1 ? history?.location?.pathname.replace('/builder/', '') : ''
    dispatch(actionSaveLDP('save', { id, data: { title: newLDPName, data: JSON.stringify(html) } }))
  }

  return (
    <>
      <Button variant="outline-primary" onClick={saveLdp}>
        <i className="hi-icon icon-cloud-download" />
        {' '}
        Lưu
      </Button>
    </>
  )
}

export default Save
