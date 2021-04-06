import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { ClassT } from "./data";
import {
  getDetailClass,
  getListTeacher,
  getListStudent,
  addStudentToClass,
} from "./service";

type Model = {
  namespace: "classManageAndDetail";
  state: ClassT;
  reducers: {
    saveDetailClass: Reducer<ClassT>;
    saveListTeacher: Reducer<ClassT>;
    saveListStudent: Reducer<ClassT>;
  };
  effects: {
    getDetailClass: Effect;
    getListTeacher: Effect;
    getListStudent: Effect;
    addStudentToClass: Effect;
  };
};

export default <Model>{
  namespace: "classManageAndDetail",
  state: {
    detailClass: {},
    listTeacher: {},
    listStudent: {}
  },
  reducers: {
    saveDetailClass(state, { payload }) {
      return {
        ...state,
        detailClass: {
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
    saveListStudent(state, { payload }) {
      return {
        ...state,
        listStudent: {
          ...payload,
        },
      };
    },
  },
  effects: {
    *getDetailClass({ payload }, { call, put }) {
      try {
        const response = yield call(getDetailClass, payload);
        yield put({
          type: "saveDetailClass",
          payload: response,
        });
      } catch (error) {
        //
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
    *getListStudent({ payload }, { call, put }) {
      try {
        const response = yield call(getListStudent, payload);
        yield put({
          type: "saveListStudent",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *addStudentToClass({ payload }, { call, put }) {
      try {
        const response = yield call(addStudentToClass, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
  },
};
