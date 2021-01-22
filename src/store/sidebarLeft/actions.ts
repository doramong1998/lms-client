import { Types } from './types'
import States from './states'

export const actionSaveTypeElement = (payload: States['typeElement']) => ({
  type: Types.SAVE_TYPE_ELEMENT,
  payload,
})
