import { setAuthority } from '@/utils/authority'
import { getPageQuery } from '@/utils/utils'
import { message } from 'antd'
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
    permissionId: localStorage.getItem('auth') || ''
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
        const response: UserAndLogin = yield call(login, payload)
        yield put({
          type: 'saveLogin',
          payload: response,
        })
        if (response?.accessToken) {
          yield localStorage.setItem('token', response?.accessToken)
          setAuthority(response?.permissionId)
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
        const err = yield error.response.json()
        message.error(err.message || 'Có lỗi xảy ra, vui lòng thử lại!')
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
