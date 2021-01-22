import { Types } from './types'
import States from './states'

export const actionCopyElement = (payload: States['copyElementId']) => ({
  type: Types.COPY_ELEMENT_ID,
  payload,
})
