import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { SubjectT } from "./data";
import {
  getListSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  getListTeacher,
} from "./service";

type Model = {
  namespace: "subjectManage";
  state: SubjectT;
  reducers: {
    saveListSubject: Reducer<SubjectT>;
    saveListTeacher: Reducer<SubjectT>;
  };
  effects: {
    getListSubject: Effect;
    createSubject: Effect;
    updateSubject: Effect;
    deleteSubject: Effect;
    getListTeacher: Effect;
  };
};

export default <Model>{
  namespace: "subjectManage",
  state: {
    listSubject: {},
    listTeacher: {},
  },
  reducers: {
    saveListSubject(state, { payload }) {
      return {
        ...state,
        listSubject: {
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
    *getListSubject({ payload }, { call, put }) {
      try {
        const response = yield call(getListSubject, payload);
        yield put({
          type: "saveListSubject",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *createSubject({ payload }, { call, put }) {
      try {
        const response = yield call(createSubject, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *updateSubject({ payload }, { call }) {
      try {
        const response = yield call(updateSubject, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *deleteSubject({ payload }, { call }) {
      try {
        const response = yield call(deleteSubject, payload);
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
