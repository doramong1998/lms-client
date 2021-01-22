import { Types } from './types'
import dataHtml from '../../utils/dataHTML.json'
import States from './states'

export const actionSaveHTML = (payload: States['html']) => ({
  type: Types.SAVE_HTML,
  payload,
})

export const actionSaveHistory = (payload: States['history']) => ({
  type: Types.SAVE_HISTORY,
  payload,
})

export const actionSaveHistoryIndex = (payload: States['historyIndex']) => ({
  type: Types.SAVE_HISTORY_INDEX,
  payload,
})

export const actionAddHistory = (payload: States['history']) => async (dispatch: any, getState: any) => {
  let newData = payload.length > 10 ? [...payload.slice(1)] : [...payload]
  const index = getState().builder.historyIndex
  if (index + 1 < newData.length - 1) {
    newData = [...newData.splice(0, index + 1), payload[payload.length - 1]]
  }
  dispatch(actionSaveHistory(newData))
  dispatch(actionSaveHistoryIndex(newData.length - 1))
}

export const actionGetHTML = () => async (dispatch: (arg0: { type: Types; payload: any }) => any) => {
  try {
    const response = {
      data: dataHtml,
    }
    await dispatch(actionSaveHTML(response.data))
    await dispatch(actionSaveHistory([response.data]))
    return response.data
  } catch (error) {
    return error
  }
}

export const actionSelectId = (payload: States['selectedId']) => ({
  type: Types.SELECT_ID,
  payload,
})

export const actionSelectSection = (payload: States['selectedSection']) => ({
  type: Types.SELECT_SECTION,
  payload,
})

export const actionVisibleColor = (payload: States['visibleColor']) => ({
  type: Types.VISIBLE_COLOR,
  payload,
})

export const actionEditText = (payload: States['editText']) => ({
  type: Types.EDIT_TEXT,
  payload,
})

export const actionSaveListGroup = (payload: States['listGroup']) => ({
  type: Types.LIST_GROUP,
  payload,
})
