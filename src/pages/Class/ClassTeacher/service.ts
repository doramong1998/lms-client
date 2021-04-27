import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getDetailClass = (payload: ParamType) => {
  return request(`${API_URL}/classes/getClassByMe`)
}

// export const getDetailSubject = (payload: ParamType) => {
//   return request(`${API_URL}/classes/detail/${payload.id}`)
// }

export const uploadFile = (payload: ParamType) => {
  return request(`${API_URL}/classes/upload/media`, {
    method: 'POST',
    data: payload.data,
  })
}
