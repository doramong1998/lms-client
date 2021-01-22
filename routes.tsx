import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router-dom'
import { actionSaveHTML, actionSaveHistory } from './store/builder/actions'
import { actionGetDataLDP, actionSetLDPName } from './store/api/actions'
import { LayoutMain, LayoutPreview } from './components'
import {
  Builder, Preview, Login, Template,
} from './pages'
import { ApplicationState } from './store'

export interface Props { }

const Routes: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const dataLDP = useSelector((state: ApplicationState) => state.api.dataLDP)

  const [getOne, setGetOne] = useState(true)
  const [idLocal, setIdLocal] = useState('')
  const pathname = history?.location?.pathname
  const access_token = history?.location?.search
  useEffect(() => {
    const id = pathname.indexOf('/builder') !== -1 ? pathname.replace('/builder/', '') : ''
    if (access_token.slice(0, 14) === '?access_token=') {
      localStorage.setItem('token', access_token.slice(14))
    }
    if (id !== '' && id !== idLocal) {
      setIdLocal(id)
      dispatch(actionGetDataLDP(id))
    }
    if (id === '' || !dataLDP || (dataLDP && !dataLDP?.status)) {
      history.push('/login')
    }
    if (dataLDP?.status && getOne) {
      const dataGet = JSON.parse(dataLDP.data.data)
      dispatch(actionSetLDPName(dataLDP.data.title))
      dispatch(actionSaveHTML(dataGet))
      dispatch(actionSaveHistory([dataGet]))
      setGetOne(false)
      history.push(`/builder/${dataLDP.data._id}`)
    }
  }, [dispatch, dataLDP, getOne, pathname, idLocal, history, access_token])

  return (
    <Switch>
      <Route exact path="/builder/:ldpId">
        <LayoutMain>
          <Builder />
        </LayoutMain>
      </Route>
      <Route exact path="/preview">
        <LayoutPreview>
          <Preview />
        </LayoutPreview>
      </Route>
      <Route exact path="/template">
        <Template />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  )
}

export default Routes
