import { Types } from './types'
import { api } from '../../utils'
import States from './states'

export const actionSaveLdpPublic = (payload: States['urlPublic']) => ({
  type: Types.PUBLISH_LDP,
  payload,
})

export const actionPublishLdp = (payload: any) => async (dispatch: (arg0: { type: Types; payload: any }) => any) => {
  try {
    const response = await api.post('/publish', payload.data)
    await dispatch(actionSaveLdpPublic(response.data))
    return response.data
  } catch (error) {
    return error
  }
}

export const actionHandleDevice = (payload: States['device']) => ({
  type: Types.HANDLE_DEVICE,
  payload,
})
