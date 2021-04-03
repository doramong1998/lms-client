import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { AccountT } from "./data";
import {
  getListAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  getListClass,
} from "./service";

type Model = {
  namespace: "accountManage";
  state: AccountT;
  reducers: {
    saveListAccount: Reducer<AccountT>;
    saveListClass: Reducer<AccountT>;
  };
  effects: {
    getListAccount: Effect;
    createAccount: Effect;
    updateAccount: Effect;
    deleteAccount: Effect;
    getListClass: Effect;
  };
};

export default <Model>{
  namespace: "accountManage",
  state: {
    listAccount: {},
    listClass: {},
  },
  reducers: {
    saveListAccount(state, { payload }) {
      return {
        ...state,
        listAccount: {
          ...payload,
        },
      };
    },
    saveListClass(state, { payload }) {
      return {
        ...state,
        listClass: {
          ...payload,
        },
      };
    },
  },
  effects: {
    *getListAccount({ payload }, { call, put }) {
      try {
        const response = yield call(getListAccount, payload);
        yield put({
          type: "saveListAccount",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
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
    *createAccount({ payload }, { call, put }) {
      try {
        const response = yield call(createAccount, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *updateAccount({ payload }, { call }) {
      try {
        const response = yield call(updateAccount, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *deleteAccount({ payload }, { call }) {
      try {
        const response = yield call(deleteAccount, payload);
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
