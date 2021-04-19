import type { Effect, Reducer } from "umi";
import type { DataT } from "./data";
import {
  getDetailUserSubject, getListSubject
} from "./service";

type Model = {
  namespace: "classAndStudent";
  state: DataT;
  reducers: {
    saveDetailSubject: Reducer<DataT>;
    saveListSubject: Reducer<DataT>;
  };
  effects: {
    getDetailUserSubject: Effect;
    getListSubject: Effect;
  };
};

export default <Model>{
  namespace: "classAndStudent",
  state: {
   detailSubject: {},
   listSubject: {}
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
    saveListSubject(state, { payload }) {
      return {
        ...state,
        listSubject: {
          ...payload,
        },
      };
    },
  },
  effects: {
    *getDetailUserSubject({ payload }, { call, put }) {
      try {
        const response = yield call(getDetailUserSubject, payload);
        yield put({
          type: "saveDetailSubject",
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
