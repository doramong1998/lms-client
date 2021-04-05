import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { ClassT } from "./data";
import {
  getDetailClass,
  getListTeacher,
} from "./service";

type Model = {
  namespace: "classManageAndDetail";
  state: ClassT;
  reducers: {
    saveDetailClass: Reducer<ClassT>;
    saveListTeacher: Reducer<ClassT>;
  };
  effects: {
    getDetailClass: Effect;
    getListTeacher: Effect;
  };
};

export default <Model>{
  namespace: "classManageAndDetail",
  state: {
    detailClass: {},
    listTeacher: {},
  },
  reducers: {
    saveDetailClass(state, { payload }) {
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
  },
};
