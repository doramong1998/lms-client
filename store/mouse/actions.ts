import { Types } from './types'
import States from './states'

export const actionHandleMouseMove = (payload: States['mouseMove']) => ({
  type: Types.HANDLE_MOUSE_MOVE,
  payload,
})

export const actionHandleMouseDown = (payload: States['mouseDown']) => ({
  type: Types.HANDLE_MOUSE_DOWN,
  payload,
})
