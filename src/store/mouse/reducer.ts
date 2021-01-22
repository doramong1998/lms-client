import { Reducer } from 'redux'
import { Types } from './types'
import States from './states'

const initialState: States = {
  mouseMove: {
    status: false,
    pageX: 0,
    pageY: 0,
  },
  mouseDown: {
    status: false,
    pageX: 0,
    pageY: 0,
    type: '',
  },
}
const mouseReducer: Reducer<States> = (state = initialState, action) => {
  switch (action.type) {
    case Types.HANDLE_MOUSE_MOVE:
      return {
        ...state,
        mouseMove: { ...action.payload },
      }
    case Types.HANDLE_MOUSE_DOWN:
      return {
        ...state,
        mouseDown: { ...action.payload },
      }
    default:
      return state
  }
}
export default mouseReducer
