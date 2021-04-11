import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { SubjectT } from "./data";
import {
  getDetailSubject,
  getListTeacher,
  getListStudent,
  addStudentToSubject,
  changeTeacherSubject,
  deleteStudentFromSubject,
  updatePoint,
  getAttend,
  postAttend
} from "./service";

type Model = {
  namespace: "subjectManageAndDetail";
  state: SubjectT;
  reducers: {
    saveDetailSubject: Reducer<SubjectT>;
    saveListTeacher: Reducer<SubjectT>;
    saveListStudent: Reducer<SubjectT>;
    saveAttendSubject: Reducer<SubjectT>;
  };
  effects: {
    getDetailSubject: Effect;
    getListTeacher: Effect;
    getListStudent: Effect;
    addStudentToSubject: Effect;
    changeTeacherSubject: Effect;
    deleteStudentFromSubject: Effect;
    updatePoint: Effect;
    getAttend: Effect;
    postAttend: Effect;
  };
};

export default <Model>{
  namespace: "subjectManageAndDetail",
  state: {
    detailSubject: {},
    listTeacher: {},
    listStudent: {},
    attendSubject: {}
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
    saveAttendSubject(state, { payload }) {
      return {
        ...state,
        attendSubject: {
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
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
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
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *deleteStudentFromSubject({ payload }, { call, put }) {
      try {
        const response = yield call(deleteStudentFromSubject, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *updatePoint({ payload }, { call, put }) {
      try {
        const response = yield call(updatePoint, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *getAttend({ payload }, { call, put }) {
      try {
        const response = yield call(getAttend, payload);
        yield put({
          type: "saveAttendSubject",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *postAttend({ payload }, { call, put }) {
      try {
        const response = yield call(postAttend, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
  },
};
