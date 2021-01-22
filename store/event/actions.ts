import { Types } from './types'
import States from './states'

export const actionDragElement = (payload: States['dragging']) => ({
  type: Types.DRAG_ELEMENT,
  payload,
})

export const actionResizeElement = (payload: States['resizing']) => ({
  type: Types.RESIZE_ELEMENT,
  payload,
})

export const actionGroupDrag = (payload: States['groupDrag']) => ({
  type: Types.GROUP_DRAG,
  payload,
})

export const actionGroupResize = (payload: States['groupResize']) => ({
  type: Types.GROUP_RESIZE,
  payload,
})

export const actionFormResize = (payload: States['formResize']) => ({
  type: Types.FORM_RESIZE,
  payload,
})

export const actionCropElement = (payload: States['cropping']) => ({
  type: Types.CROP_ELEMENT,
  payload,
})

export const actionSnapElement = (payload: States['snapElememnt']) => ({
  type: Types.SNAP_ELEMENT,
  payload,
})

export const actionEditCarosel = (payload: States['editingCarosel']) => ({
  type: Types.EDIT_CAROSEL,
  payload,
})

export const actionNumberCarosel = (payload: States['numberCarosel']) => ({
  type: Types.NUMBER_CAROSEL,
  payload,
})
