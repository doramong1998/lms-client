import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { ClassT } from "./data";
import {
  getDetailClass,
  getListTeacher,
  getListStudent,
  addStudentToClass,
  changeTeacherClass,
  deleteStudentFromClass,
  getPointStudent,
  getClassByStudent,
  addFileStudentToClass
} from "./service";

type Model = {
  namespace: "classManageAndDetail";
  state: ClassT;
  reducers: {
    saveDetailClass: Reducer<ClassT>;
    saveListTeacher: Reducer<ClassT>;
    saveListStudent: Reducer<ClassT>;
    savePointStudent: Reducer<ClassT>;
    saveListClassStudent: Reducer<ClassT>;
  };
  effects: {
    getDetailClass: Effect;
    getListTeacher: Effect;
    getListStudent: Effect;
    addStudentToClass: Effect;
    changeTeacherClass: Effect;
    deleteStudentFromClass: Effect;
    getPointStudent: Effect;
    getClassByStudent: Effect;
    addFileStudentToClass: Effect;
  };
};

export default <Model>{
  namespace: "classManageAndDetail",
  state: {
    detailClass: {},
    listTeacher: {},
    listStudent: {},
    pointStudent: {},
    listClassStudent: {}
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
    savePointStudent(state, { payload }) {
      return {
        ...state,
        pointStudent: {
          ...payload,
        },
      };
    },
    saveListClassStudent(state, { payload }) {
      return {
        ...state,
        listClassStudent: {
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
    *addFileStudentToClass({ payload }, { call, put }) {
      try {
        const response = yield call(addFileStudentToClass, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *changeTeacherClass({ payload }, { call, put }) {
      try {
        const response = yield call(changeTeacherClass, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *deleteStudentFromClass({ payload }, { call, put }) {
      try {
        const response = yield call(deleteStudentFromClass, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *getPointStudent({ payload }, { call, put }) {
      try {
        const response = yield call(getPointStudent, payload);
        yield put({
          type: "savePointStudent",
          payload: response,
        });
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *getClassByStudent({ payload }, { call, put }) {
      try {
        const response = yield call(getClassByStudent, payload);
        yield put({
          type: "saveListClassStudent",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
  },
};
