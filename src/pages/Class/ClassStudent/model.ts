import type { Effect, Reducer } from "umi";
import type { DataT } from "./data";
import {
  getClassByMe, getListSubject
} from "./service";

type Model = {
  namespace: "classAndStudent";
  state: DataT;
  reducers: {
    saveDetailClass: Reducer<DataT>;
    saveListSubject: Reducer<DataT>;
  };
  effects: {
    getClassByMe: Effect;
    getListSubject: Effect;
  };
};

export default <Model>{
  namespace: "classAndStudent",
  state: {
   detailClass: {},
   pointUser: {}
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
    saveListSubject(state, { payload }) {
      return {
        ...state,
        pointUser: {
          ...payload,
        },
      };
    },
  },
  effects: {
    *getClassByMe({ payload }, { call, put }) {
      try {
        const response = yield call(getClassByMe, payload);
        yield put({
          type: "saveDetailClass",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
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
  },
};
