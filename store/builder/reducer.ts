import { Reducer } from 'redux'
import { Types } from './types'
import States from './states'

const initialState: States = {
  html: {
    meta: {},
    code: {},
    conversionCode: {},
    elements: [],
    sections: [],
    formItem: [],
  },
  selectedId: '',
  visibleColor: {},
  selectedSection: {},
  editText: false,
  listGroup: null,
  history: [],
  historyIndex: 0,
}
const builderReducer: Reducer<States> = (state = initialState, action) => {
  switch (action.type) {
    case Types.SAVE_HTML:
      return {
        ...state,
        html: { ...action.payload },
      }
    case Types.SELECT_ID:
      return {
        ...state,
        selectedId: action.payload,
      }
    case Types.VISIBLE_COLOR:
      return {
        ...state,
        visibleColor: action.payload,
      }
    case Types.SELECT_SECTION:
      return {
        ...state,
        selectedSection: action.payload,
      }
    case Types.EDIT_TEXT:
      return {
        ...state,
        editText: action.payload,
      }
    case Types.LIST_GROUP:
      return {
        ...state,
        listGroup: action.payload,
      }
    case Types.SAVE_HISTORY:
      return {
        ...state,
        history: [...action.payload],
      }
    case Types.SAVE_HISTORY_INDEX:
      return {
        ...state,
        historyIndex: action.payload,
      }
    default:
      return state
  }
}
export default builderReducer
