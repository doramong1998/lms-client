import request from '@/utils/request'
import { API_URL, VIRUSTOTAL_URL, KEY_API } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getListFile = () => {
  return request(`${API_URL}/getMyFile`)
}

export const createFile = (payload: ParamType) => {
  return request(`${API_URL}/upload/media`, {
    method: 'POST',
    data: payload.data,
  })
}

export const updateFile = (payload: ParamType) => {
  return request(`${API_URL}/users/update/${payload.id}`, {
    method: 'PUT',
    data: payload.data,
  })
}

export const deleteFile = (payload: ParamType) => {
  return request(`${API_URL}/users/delete`, {
    method: 'DELETE',
    data: payload.data
  })
}

export const scanBeforeUpload = (payload: ParamType) => {
  return request(`${VIRUSTOTAL_URL}/scan`, {
    method: 'POST',
    data: payload.data,
  })
}

export const resultScan = (payload: ParamType) => {
  return request(`${VIRUSTOTAL_URL}/report?apikey=${KEY_API}&resource=${payload.query}`)
}

// export const scanBeforeUpload = (payload: ParamType) => {
//   return request(`/scan`, {
//     method: 'POST',
//     data: payload.data,
//   })
// }

// export const resultScan = (payload: ParamType) => {
//   return request('/resultScan')
// }