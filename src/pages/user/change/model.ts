import { notification } from 'antd'
import type { Effect, Reducer } from 'umi'
import { history, formatMessage } from 'umi'
import type { UserAndChange } from './data'
import { change } from './service'

type Model = {
  namespace: string
  state: UserAndChange
  reducers: {
    saveChange: Reducer<UserAndChange>
  }
  effects: {
    change: Effect
  }
}

export default <Model>{
  namespace: 'userAndChange',
  state: {
    statusCode: 200,
  },
  reducers: {
    saveChange(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    *change({ payload }, { call, put }) {
      try {
        const response = yield call(change, payload)
        yield put({
          type: 'saveChange',
          payload: response,
        })
        notification.success({
          message: formatMessage({ id: 'change.success.message' }),
          description: formatMessage({ id: 'change.success.description' }),
          placement: 'bottomLeft',
          duration: 10,
        })
        history.push('/user/login')
      } catch (error) {
        yield put({
          type: 'saveChange',
          payload: error.data,
        })
      }
    },
  },
}
