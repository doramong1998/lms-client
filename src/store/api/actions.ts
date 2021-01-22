import swal from 'sweetalert'
import { api } from '../../utils'
import { Types } from './types'
import States from './states'

// resultImage
export const resultUploadImage = (payload: States['uploadImage']) => ({
  type: Types.UPLOAD_IMAGE,
  payload,
})

export const resultUploadImageUrl = (payload: States['uploadImageUrl']) => ({
  type: Types.UPLOAD_IMAGE_URL,
  payload,
})

export const resultGetImages = (payload: States['getImages']) => ({
  type: Types.GET_IMAGES,
  payload,
})

// resultSection
export const resultSaveSection = (payload: States['saveSection']) => ({
  type: Types.SAVE_SECTION,
  payload,
})

export const resultGetSection = (payload: States['getSection']) => ({
  type: Types.GET_SECTION,
  payload,
})

// actionImage
export const actionUploadImage = (payload: any) => async (dispatch: any) => {
  try {
    const response = await api.post('/upload', payload)
    if (response.data) {
      await dispatch(resultUploadImage(response.data))
      dispatch(actionGetImages())
    }
    return response.data
  } catch (error) {
    //
  }
}

export const actionUploadImageUrl = (payload: any) => async (dispatch: any) => {
  try {
    const response = await api.post('/upload-url', payload)
    if (response.data) {
      await dispatch(resultUploadImage(response.data))
      dispatch(actionGetImages())
    }
    return response.data
  } catch (error) {
    //
  }
}

export const actionGetImages = () => async (dispatch: any) => {
  try {
    const response = await api.get('/media')
    if (response.data) {
      await dispatch(resultGetImages(response.data))
    }
    return response.data
  } catch (error) {
    //
  }
}

export const actionPostImages64 = (payload: any) => async () => {
  try {
    const response = await api.post('/media', payload.data)
    return response.data
  } catch (error) {
    //
  }
}

// actionSections
export const actionSaveSection = (payload: any) => async (dispatch: any) => {
  try {
    const response = await api.post('/sections', payload)
    if (response.data) {
      await dispatch(resultSaveSection(response.data))
      if (response.data.status) swal('Lưu thành công!', '', 'success')
      dispatch(actionGetSection())
    }
    return response.data
  } catch (error) {
    console.log(error)
    swal('Lưu thất bại!', '', 'error')
  }
}

export const actionGetSection = () => async (dispatch: any) => {
  try {
    const response = await api.get('/sections')
    if (response.data) {
      await dispatch(resultGetSection(response.data))
    }
    return response.data
  } catch (error) {
    //
  }
}

export const actionSubmitForm = (payload: any) => async () => {
  try {
    const response = await api.post(`/form/${payload.site}`, payload.data)
    return response.data
  } catch (error) {
    //
  }
}

// actionGetAccessToken
export const resultAccessToken = (payload: States['accessToken']) => ({
  type: Types.GET_ACCESS_TOKEN,
  payload,
})

export const actionGetAccessToken = (payload: any) => async (dispatch: any) => {
  try {
    const response = await api.post('/get-access-token', payload)
    if (response.data) {
      await dispatch(resultAccessToken(response.data))
    }
    return response.data
  } catch (error) {
    //
  }
}

// actionGetKeyCreateApp
export const resultKeyCreateApp = (payload: States['keyCreateApp']) => ({
  type: Types.GET_ACCESS_TOKEN,
  payload,
})

export const actionGetKeyCreateApp = (payload: any) => async (dispatch: any) => {
  try {
    const response = await api.post('/application', payload)
    if (response.data) {
      await dispatch(resultKeyCreateApp(response.data))
    }
    return response.data
  } catch (error) {
    //
  }
}

// actionCreateLDP
export const resultCreateLDP = (payload: States['ldpId']) => ({
  type: Types.CREATE_LDP,
  payload,
})

export const actionCreateLDP = (payload: any) => async (dispatch: any) => {
  try {
    const response = await api.post('/ldpage', { title: payload })
    if (response.data) {
      await dispatch(resultCreateLDP(response.data))
    }
    return response.data
  } catch (error) {
    //
  }
}

// actionGetDataLDP
export const resultGetDataLDP = (payload: States['dataLDP']) => ({
  type: Types.GET_DATA_LDP,
  payload,
})

export const actionGetDataLDP = (payload: any) => async (dispatch: any) => {
  try {
    const response = await api.get(`/ldpage/${payload}`)
    if (response.data) {
      await dispatch(resultGetDataLDP(response.data))
    }
    return response.data
  } catch (error) {
    await dispatch(resultGetDataLDP(null))
  }
}

// actionSaveLDP
export const resultSaveLDP = (payload: States['saveLDP']) => ({
  type: Types.SAVE_LDP,
  payload,
})

export const actionSaveLDP = (type: string, payload: any) => async (dispatch: any) => {
  try {
    const response = await api.put(`/ldpage/${payload?.id}`, payload?.data)
    if (response.data) {
      await dispatch(resultSaveLDP(response.data))
      if (response.data.status && type === 'save') swal('Lưu thành công!', '', 'success')
    }
    return response.data
  } catch (error) {
    console.log(error)
    swal('Lưu thất bại!', '', 'error')
  }
}

// actionGetDataLDP
export const resultGetAllLDP = (payload: States['dataLDP']) => ({
  type: Types.GET_ALL_LDP,
  payload,
})

export const actionGetAllLDP = () => async (dispatch: any) => {
  try {
    const response = await api.get('/ldpage')
    if (response.data) {
      await dispatch(resultGetAllLDP(response.data))
    }
    return response.data
  } catch (error) {
    //
  }
}

// actionSetLDPName
export const actionSetLDPName = (payload: States['newLDPName']) => ({
  type: Types.NEW_LDP_NAME,
  payload,
})
