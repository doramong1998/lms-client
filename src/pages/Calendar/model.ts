import { message } from 'antd'
import type { Effect, Reducer } from 'umi'
import { history } from 'umi'
import { formatMessage } from 'umi'
import type { LandingPageT } from './data'
import {
  getLandingPage,
  createLandingPage,
  editLandingPage,
  deleteLandingPage,
  deleteMultiLandingPage,
} from './service'

type Model = {
  namespace: 'landingPages'
  state: LandingPageT
  reducers: {
    savelistLandingPage: Reducer<LandingPageT>
    savelandingPageCreated: Reducer<LandingPageT>
  }
  effects: {
    getLandingPage: Effect
    createLandingPage: Effect
    editLandingPage: Effect
    deleteLandingPage: Effect
    deleteMultiLandingPage: Effect
  }
}

export default <Model>{
  namespace: 'landingPages',
  state: {
    listLandingPage: {
      status: false,
    },
    landingPageCreated: {
      status: false,
    },
  },
  reducers: {
    savelistLandingPage(state, { payload }) {
      return {
        ...state,
        listLandingPage: {
          ...payload,
        },
      }
    },
    savelandingPageCreated(state, { payload }) {
      return {
        ...state,
        landingPageCreated: {
          ...payload,
        },
      }
    },
  },
  effects: {
    *getLandingPage({ payload }, { call, put }) {
      try {
        const response = yield call(getLandingPage, payload)
        if (response.status === 403) {
          localStorage.removeItem('token')
          history.push('/user/login')
        } else {
          yield put({
            type: 'savelistLandingPage',
            payload: response,
          })
        }
      } catch (error) {
        //
      }
    },
    *createLandingPage({ payload }, { call, put }) {
      try {
        const response = yield call(createLandingPage, payload)
        yield put({
          type: 'savelandingPageCreated',
          payload: response,
        })
      } catch (error) {
        message.error(formatMessage({ id: 'error' }))
      }
    },
    *editLandingPage({ payload }, { call }) {
      try {
        yield call(editLandingPage, payload)
      } catch (error) {
        message.error(formatMessage({ id: 'error' }))
      }
    },
    *deleteLandingPage({ payload }, { call }) {
      try {
        yield call(deleteLandingPage, payload)
      } catch (error) {
        message.error(formatMessage({ id: 'error' }))
      }
    },
    *deleteMultiLandingPage({ payload }, { call }) {
      try {
        yield call(deleteMultiLandingPage, payload)
      } catch (error) {
        message.error(formatMessage({ id: 'error' }))
      }
    },
  },
}
