import type { Effect, Reducer } from 'umi'
import type { ThemeT } from './data'
import {
  getThemes, getTabs,
} from './service'

type Model = {
  namespace: 'themes'
  state: ThemeT
  reducers: {
    saveListTheme: Reducer<ThemeT>,
    saveListTab: Reducer<ThemeT>
  }
  effects: {
    getThemes: Effect,
    getTabs: Effect
  }
}

export default <Model>{
  namespace: 'themes',
  state: {
    listTheme: {
      status: false,
    },
    listTab: {
      status: false,
    },
  },
  reducers: {
    saveListTheme(state, { payload }) {
      return {
        ...state,
        listTheme: {
          ...payload,
        },
      }
    },
    saveListTab(state, { payload }) {
      return {
        ...state,
        listTab: {
          ...payload,
        },
      }
    },
  },
  effects: {
    *getThemes({ payload }, { call, put }) {
      try {
        const response = yield call(getThemes, payload)
        yield put({
          type: 'saveListTheme',
          payload: response,
        })
      } catch (error) {
        //
      }
    },
    *getTabs({ payload }, { call, put }) {
      try {
        const response = yield call(getTabs, payload)
        yield put({
          type: 'saveListTab',
          payload: response,
        })
      } catch (error) {
        //
      }
    },
  },
}
