import { getPageQuery } from '@/utils/utils'
import { stringify } from 'querystring'
import type { Effect, Reducer } from 'umi'
import { history } from 'umi'
import type { UserAndLogin } from './data'
import { login } from './service'

type Model = {
  namespace: string
  state: UserAndLogin
  reducers: {
    saveLogin: Reducer<UserAndLogin>
  }
  effects: {
    login: Effect
    logout: Effect
  }
}

export default <Model>{
  namespace: 'userAndLogin',
  state: {
    status: true,
    accessToken: localStorage.getItem('token') || '',
  },
  reducers: {
    saveLogin(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        // const response: UserAndLogin = yield call(login, payload)
        const response = {
          accessToken: 'ok',
          status: true
        }
        yield put({
          type: 'saveLogin',
          payload: response,
        })
        if (response?.accessToken) {
          yield localStorage.setItem('token', response?.accessToken)
          setTimeout(() => {
            const urlParams = new URL(window.location.href)
            const params = getPageQuery()
            let { redirect } = params as { redirect: string }
            if (redirect) {
              const redirectUrlParams = new URL(redirect)
              if (redirectUrlParams.origin === urlParams.origin) {
                redirect = redirect.substr(urlParams.origin.length)
                if (redirect.match(/^\/.*#/)) {
                  redirect = redirect.substr(redirect.indexOf('#') + 1)
                }
              } else {
                window.location.href = redirect
                return
              }
            }
            history.replace(redirect || '/')
          }, 100)
        }
      } catch (error) {
        yield put({
          type: 'saveLogin',
          payload: error.data,
        })
      }
    },
    *logout() {
      const { redirect } = getPageQuery()
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield localStorage.removeItem('token')
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      }
    },
  },
}
