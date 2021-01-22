import { Reducer } from 'redux'
import { Types } from './types'
import States from './states'

const initialState: States = {
  dragging: false,
  resizing: false,
  cropping: false,
  groupDrag: null,
  groupResize: null,
  formResize: null,
  snapElememnt: null,
  editingCarosel: null,
  numberCarosel: 0,
}

const EventReducer: Reducer<States> = (state = initialState, action) => {
  switch (action.type) {
    case Types.DRAG_ELEMENT:
      return {
        ...state,
        dragging: action.payload,
      }
    case Types.RESIZE_ELEMENT:
      return {
        ...state,
        resizing: action.payload,
      }
    case Types.GROUP_DRAG:
      return {
        ...state,
        groupDrag: action.payload,
      }
    case Types.GROUP_RESIZE:
      return {
        ...state,
        groupResize: action.payload,
      }
    case Types.FORM_RESIZE:
      return {
        ...state,
        formResize: action.payload,
      }
    case Types.CROP_ELEMENT:
      return {
        ...state,
        cropping: action.payload,
      }
    case Types.SNAP_ELEMENT:
      return {
        ...state,
        snapElememnt: action.payload,
      }
    case Types.EDIT_CAROSEL:
      return {
        ...state,
        editingCarosel: action.payload,
      }
    case Types.NUMBER_CAROSEL:
      return {
        ...state,
        numberCarosel: action.payload,
      }
    default:
      return state
  }
}

export default EventReducer
