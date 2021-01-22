import { Reducer } from 'redux'
import { Types } from './types'
import States from './states'

const initialState: States = {
  copyElementId: '',
}

const ToolbarReducer: Reducer<States> = (state = initialState, action) => {
  switch (action.type) {
    case Types.COPY_ELEMENT_ID:
      return {
        ...state,
        copyElementId: action.payload,
      }
    default:
      return state
  }
}
export default ToolbarReducer
