import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { ClassT } from "./data";
import {
  getListClass,
  createClass,
  updateClass,
  deleteClass,
  getListTeacher,
} from "./service";

type Model = {
  namespace: "classAndTeacher";
  state: ClassT;
  reducers: {
    saveListClass: Reducer<ClassT>;
    saveListTeacher: Reducer<ClassT>;
  };
  effects: {
    getListClass: Effect;
    createClass: Effect;
    updateClass: Effect;
    deleteClass: Effect;
    getListTeacher: Effect;
  };
};

export default <Model>{
  namespace: "classAndTeacher",
  state: {
    listClass: {},
    listTeacher: {},
  },
  reducers: {
    saveListClass(state, { payload }) {
      return {
        ...state,
        listClass: {
          ...payload,
        },
      };
    },
    saveListTeacher(state, { payload }) {
      return {
        ...state,
        listTeacher: {
          ...payload,
        },
      };
    },
  },
  effects: {
    *getListClass({ payload }, { call, put }) {
      try {
        const response = yield call(getListClass, payload);
        yield put({
          type: "saveListClass",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *createClass({ payload }, { call, put }) {
      try {
        const response = yield call(createClass, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *updateClass({ payload }, { call }) {
      try {
        const response = yield call(updateClass, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *deleteClass({ payload }, { call }) {
      try {
        const response = yield call(deleteClass, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *getListTeacher({ payload }, { call, put }) {
      try {
        const response = yield call(getListTeacher, payload);
        yield put({
          type: "saveListTeacher",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
  },
};
