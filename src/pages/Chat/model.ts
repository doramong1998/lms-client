import { message } from "antd";
import type { Effect, Reducer } from "umi";
import type { FileT } from "./data";
import {
  getListFile,
  createFile,
  updateFile,
  deleteFile,
  resultScan,
  scanBeforeUpload,
  updateTimeFile,
  deleteFileClass,
  deleteFileSubject
} from "./service";

type Model = {
  namespace: "chatting";
  state: FileT;
  reducers: {
    saveListFile: Reducer<FileT>;
  };
  effects: {
    getListFile: Effect;
    createFile: Effect;
    updateFile: Effect;
    deleteFile: Effect;
    resultScan: Effect;
    scanBeforeUpload: Effect;
    updateTimeFile: Effect;
    deleteFileClass: Effect;
    deleteFileSubject: Effect;
  };
};

export default <Model>{
  namespace: "chatting",
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
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
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
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
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
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *resultScan({ payload }, { call, put }) {
      try {
        yield new Promise((resolve) => setTimeout(resolve, 5000));
        const response = yield call(resultScan, payload);
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *scanBeforeUpload({ payload }, { call, put }) {
      try {
        const response = yield call(scanBeforeUpload, payload);
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *updateTimeFile({ payload }, { call, put }) {
      try {
        const response = yield call(updateTimeFile, payload);
        message.success(response?.message || "Gia hạn thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *deleteFileClass({ payload }, { call }) {
      try {
        const response = yield call(deleteFileClass, payload);
        message.success(response?.message || "Thành công!");
        return Promise.resolve(response);
      } catch (error) {
        const err = yield error.response.json();
        message.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        return Promise.reject(err);
      }
    },
    *deleteFileSubject({ payload }, { call }) {
      try {
        const response = yield call(deleteFileSubject, payload);
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
