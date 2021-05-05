import { message } from 'antd'
import type { Effect, Reducer } from 'umi'
import type { CalendarT } from './data'
import {
  getCalendar, createCalendar, deleteCalendar, updateCalendar
} from './service'

type Model = {
  namespace: 'calendar'
  state: CalendarT
  reducers: {
    saveDataCalendar: Reducer<CalendarT>
  }
  effects: {
   getCalendar: Effect;
   createCalendar: Effect;
   deleteCalendar: Effect;
   updateCalendar: Effect;
  }
}

export default <Model>{
  namespace: 'calendar',
  state: {
    dataCalendar: {}
  },
  reducers: {
    saveDataCalendar(state, { payload }) {
      return {
        ...state,
        dataCalendar: {
          ...payload,
        },
      }
    },
  },
  effects: {
    *getCalendar({ payload }, { call, put }) {
      try {
        const response = yield call(getCalendar, payload)
          yield put({
            type: 'saveDataCalendar',
            payload: response,
          })
          return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *createCalendar({ payload }, { call }) {
      try {
        const response = yield call(createCalendar, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *deleteCalendar({ payload }, { call }) {
      try {
        const response = yield call(deleteCalendar, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *updateCalendar({ payload }, { call }) {
      try {
        const response = yield call(updateCalendar, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
  },
}
