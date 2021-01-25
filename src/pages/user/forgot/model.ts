import { notification } from 'antd'
import type { Effect, Reducer } from 'umi'
import { history, formatMessage } from 'umi'
import type { UserAndForgot } from './data'
import { forgot } from './service'

type Model = {
  namespace: string
  state: UserAndForgot
  reducers: {
    saveForgot: Reducer<UserAndForgot>
  }
  effects: {
    forgot: Effect
  }
}

export default <Model>{
  namespace: 'userAndForgot',
  state: {
    statusCode: 200,
  },
  reducers: {
    saveForgot(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    *forgot({ payload }, { call, put }) {
      try {
        const response = yield call(forgot, payload)
        yield put({
          type: 'saveForgot',
          payload: response,
        })
        notification.success({
          message: formatMessage({ id: 'forgot.success.message' }),
          description: formatMessage({ id: 'forgot.success.description' }),
          placement: 'bottomLeft',
          duration: 10,
        })
        history.push('/user/login')
      } catch (error) {
        yield put({
          type: 'saveForgot',
          payload: error.data,
        })
      }
    },
  },
}
