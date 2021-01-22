import React, { FunctionComponent, useState, useEffect } from 'react'
import './styles.scss'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {
  Link,
} from 'react-router-dom'
import {
  actionGetAccessToken, actionCreateLDP, actionGetAllLDP, actionSetLDPName, actionGetDataLDP,
} from '../../store/api/actions'
import { ApplicationState } from '../../store'

export interface Props {}

const Login: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [appId, setAppId] = useState('226518af-5817-4db6-843b-080c3ba48db9')
  const [userId, setUserId] = useState('')
  const [accToken, setAccToken] = useState('')
  const [ldp, setLDP] = useState('')
  const [type, setType] = useState('new')
  const [check, setCheck] = useState(true)
  const [nameLDP, setNameLDP] = useState('')

  const accessToken = useSelector((state: ApplicationState) => state.api.accessToken)
  const ldpId = useSelector((state: ApplicationState) => state.api.ldpId)
  const getAllLDP = useSelector((state: ApplicationState) => state.api.getAllLDP)

  const onSubmit = () => {
    setType('new')
    setCheck(true)
    dispatch(actionSetLDPName(nameLDP))
    dispatch(actionGetAccessToken({ appId, userId }))
  }

  const onOpen = () => {
    setType('open')
    setCheck(true)
    dispatch(actionGetAccessToken({ appId, userId }))
  }

  const onList = () => {
    setType('list')
    setCheck(true)
    dispatch(actionGetAccessToken({ appId, userId }))
  }

  useEffect(() => {
    if (ldpId?.status) {
      // history.push({
      //   pathname: `/builder/${ldpId.data.ldpId}`,
      //   state: {
      //     id: ldpId.data.ldpId,
      //   },
      // })
      history.push('/template')
    }
    if (accessToken?.status && check) {
      localStorage.setItem('token', accessToken.accessToken)
      setAccToken(accessToken.accessToken)
      if (type === 'new') {
        dispatch(actionCreateLDP(nameLDP))
      } else if (type === 'open') {
        history.push({
          pathname: `/builder/${ldp}`,
          state: {
            id: ldp,
          },
        })
      } else dispatch(actionGetAllLDP())
      setCheck(false)
    }
  }, [accessToken, history, dispatch, ldpId, type, ldp, check, nameLDP])

  const checkDisableNew = () => {
    if (appId === '' || userId === '' || nameLDP === '') return true
    return false
  }

  const checkDisableList = () => {
    if (appId === '' || userId === '') return true
    return false
  }

  const checkDisableOpen = () => {
    if (appId === '' || userId === '' || ldp === '') return true
    return false
  }

  const onLink = (e:any, id: string) => {
    e.preventDefault()
    dispatch(actionGetDataLDP(id))
  }

  return (
    <div className="container">
      <div className="form__item">
        <div className="__heading">
          DEV LANDING PAGE
        </div>
        <div className="main-modal">
          <div className="main-modal__left">
            <div className="__input">
              <div>
                <div className="d-flex align-items-center justify-content-between my-2">
                  <label>App_ID:</label>
                  <div className="__input_value">
                    <input value={appId} onChange={e => setAppId(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="__input">
              <div>
                <div className="d-flex align-items-center justify-content-between my-2">
                  <label>User_ID:</label>
                  <div className="__input_value">
                    <input value={userId} onChange={e => setUserId(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="__input">
              <div>
                <div className="d-flex align-items-center justify-content-between my-2">
                  <label>
                    New LDP
                    {'\''}
                    s name:
                  </label>
                  <div className="__input_value">
                    <input value={nameLDP} onChange={e => setNameLDP(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="__input">
              <div>
                <div className="d-flex align-items-center justify-content-between my-2">
                  <label>Access_Token:</label>
                  <div className="__input_value">
                    <input value={accToken} disabled />
                  </div>
                </div>
              </div>
            </div>
            <div className="__input">
              <div>
                <div className="d-flex align-items-center justify-content-between my-2">
                  <label>LDP_ID:</label>
                  <div className="__input_value">
                    <input value={ldp} onChange={e => setLDP(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-modal__right">
            <div className="__submit">
              <Button disabled={checkDisableNew() ? true : false} variant="primary" style={{ width: '180px' }} onClick={onSubmit}>New LDP</Button>
            </div>
            <div className="__submit">
              <Button disabled={checkDisableOpen() ? true : false} variant="primary" style={{ width: '180px' }} onClick={onOpen}>Open LDP</Button>
            </div>
            <div className="__submit">
              <Button disabled={checkDisableList() ? true : false} variant="primary" style={{ width: '180px' }} onClick={onList}>List LDP</Button>
            </div>
          </div>
        </div>
        {getAllLDP?.status && getAllLDP?.data.length > 0 && (
        <div>
          <ol>
            {getAllLDP?.data.map((item: any, index: number) => <li key={index}><Link to={`/builder/${item?._id}`} onClick={(e:any) => onLink(e, item?._id)}>{item?.title}</Link></li>)}
          </ol>

        </div>
        )}
        {(!getAllLDP?.status || getAllLDP?.data.length) === 0 && (
        <div>
          Không có dữ liệu!
        </div>
        )}
      </div>
    </div>
  )
}

export default Login
