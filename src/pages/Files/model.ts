import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { FileT } from "./data";
import {
  getListFile,
  createFile,
  updateFile,
  deleteFile,
} from "./service";

type Model = {
  namespace: "files";
  state: FileT;
  reducers: {
    saveListFile: Reducer<FileT>;
  };
  effects: {
    getListFile: Effect;
    createFile: Effect;
    updateFile: Effect;
    deleteFile: Effect;
  };
};

export default <Model>{
  namespace: "files",
  state: {
    listFile: {},
    listClass: {},
  },
  reducers: {
    saveListFile(state, { payload }) {
      return {
        ...state,
        listFile: {
          ...payload,
        },
      };
    },
  },
  effects: {
    *getListFile({ payload }, { call, put }) {
      try {
        const response = yield call(getListFile, payload);
        yield put({
          type: "saveListFile",
          payload: response,
        });
      } catch (error) {
        //
      }
    },
    *createFile({ payload }, { call, put }) {
      try {
        const response = yield call(createFile, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *updateFile({ payload }, { call }) {
      try {
        const response = yield call(updateFile, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.error || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *deleteFile({ payload }, { call }) {
      try {
        const response = yield call(deleteFile, payload);
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
