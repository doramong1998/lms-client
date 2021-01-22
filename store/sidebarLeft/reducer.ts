import { Reducer } from 'redux'
import { Types } from './types'
import States from './states'

const initialState: States = {
  typeElement: '',
}
const sidebarLeftReducer: Reducer<States> = (state = initialState, action) => {
  switch (action.type) {
    case Types.SAVE_TYPE_ELEMENT:
      return {
        ...state,
        typeElement: action.payload,
      }
    default:
      return state
  }
}
export default sidebarLeftReducer
