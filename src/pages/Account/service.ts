import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}


export const getAccount = () => {
  return request(`${API_URL}/users/me`)
}

export const getListClass = () => {
  return request(`${API_URL}/classes`)
}

export const updateAccount = (payload: ParamType) => {
  return request(`${API_URL}/users/updateMe`, {
    method: 'PUT',
    data: payload.data,
  })
}