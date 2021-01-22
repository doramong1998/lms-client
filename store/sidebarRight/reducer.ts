import { Reducer } from 'redux'
import { Types } from './types'
import States from './states'

const initialState: States = {
  urlPublic: {},
  device: 'desktop',
}
const sidebarRightReducer: Reducer<States> = (state = initialState, action) => {
  switch (action.type) {
    case Types.PUBLISH_LDP:
      return {
        ...state,
        urlPublic: { ...action.payload },
      }
    case Types.HANDLE_DEVICE:
      return {
        ...state,
        device: action.payload,
      }
    default:
      return state
  }
}
export default sidebarRightReducer
