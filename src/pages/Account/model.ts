import type { Effect, Reducer } from "umi";
import type { AccountT } from "./data";
import { getAccount } from "./service";

type Model = {
  namespace: "account";
  state: AccountT;
  reducers: {
    saveAccount: Reducer<AccountT>;
  };
  effects: {
    getAccount: Effect;
  };
};

export default <Model>{
  namespace: "account",
  state: {
    detailAccount: {},
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
  },
};
