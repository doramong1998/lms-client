import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { SubjectT } from "./data";
import {
  getDetailSubject,
  getListTeacher,
  getListStudent,
  addStudentToSubject,
  changeTeacherSubject
} from "./service";

type Model = {
  namespace: "subjectManageAndDetail";
  state: SubjectT;
  reducers: {
    saveDetailSubject: Reducer<SubjectT>;
    saveListTeacher: Reducer<SubjectT>;
    saveListStudent: Reducer<SubjectT>;
  };
  effects: {
    getDetailSubject: Effect;
    getListTeacher: Effect;
    getListStudent: Effect;
    addStudentToSubject: Effect;
    changeTeacherSubject: Effect;
  };
};

export default <Model>{
  namespace: "subjectManageAndDetail",
  state: {
    detailSubject: {},
    listTeacher: {},
    listStudent: {}
  },
  reducers: {
    saveDetailSubject(state, { payload }) {
      return {
        ...state,
        detailSubject: {
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
    *getDetailSubject({ payload }, { call, put }) {
      try {
        const response = yield call(getDetailSubject, payload);
        yield put({
          type: "saveDetailSubject",
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
    *addStudentToSubject({ payload }, { call, put }) {
      try {
        const response = yield call(addStudentToSubject, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *changeTeacherSubject({ payload }, { call, put }) {
      try {
        const response = yield call(changeTeacherSubject, payload);
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
