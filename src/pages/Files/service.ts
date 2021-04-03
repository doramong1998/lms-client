import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

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

