// import type { Effect, Reducer } from 'umi'
// import type { ThemeT } from './data'
// import {
//   getThemes,
// } from './service'

// type Model = {
//   namespace: 'settings'
//   state: ThemeT
//   reducers: {
//     saveListTheme: Reducer<ThemeT>,
//   }
//   effects: {
//     getThemes: Effect,
//     getTabs: Effect
//   }
// }

// export default <Model>{
//   namespace: 'settings',
//   state: {
//     listTheme: {
//       status: false,
//     },
//     listTab: {
//       status: false,
//     },
//   },
//   reducers: {
//     saveListTheme(state, { payload }) {
//       return {
//         ...state,
//         listTheme: {
//           ...payload,
//         },
//       }
//     },
//     saveListTab(state, { payload }) {
//       return {
//         ...state,
//         listTab: {
//           ...payload,
//         },
//       }
//     },
//   },
//   effects: {
//     *getThemes({ payload }, { call, put }) {
//       try {
//         const response = yield call(getThemes, payload)
//         yield put({
//           type: 'saveListTheme',
//           payload: response,
//         })
//       } catch (error) {
//         //
//       }
//     },
//   },
// }
