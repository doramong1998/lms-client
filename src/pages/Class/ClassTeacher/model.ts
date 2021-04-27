import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { ClassT } from "./data";
import {
  getDetailClass,
  uploadFile
} from "./service";

type Model = {
  namespace: "classAndTeacher";
  state: ClassT;
  reducers: {
    saveDetailClass: Reducer<ClassT>;
  };
  effects: {
    getDetailClass: Effect;
    uploadFile: Effect;
  };
};

export default <Model>{
  namespace: "classAndTeacher",
  state: {
    detailClass: {},
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
    *uploadFile({ payload }, { call, put }) {
      try {
        const response = yield call(uploadFile, payload);
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
