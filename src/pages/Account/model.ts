import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { AccountT } from "./data";
import { getAccount, getListClass, updateAccount } from "./service";

type Model = {
  namespace: "account";
  state: AccountT;
  reducers: {
    saveAccount: Reducer<AccountT>;
    saveListClass: Reducer<AccountT>;
  };
  effects: {
    getAccount: Effect;
    getListClass: Effect;
    updateAccount: Effect;
  };
};

export default <Model>{
  namespace: "account",
  state: {
    detailAccount: {},
    listClass: {}
  },
  reducers: {
    saveAccount(state, { payload }) {
      return {
        ...state,
        detailAccount: {
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
    *getAccount({ payload }, { call, put }) {
      try {
        const response = yield call(getAccount, payload);
        yield put({
          type: "saveAccount",
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
  },
};
