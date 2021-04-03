import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getListClass = () => {
  return request(`${API_URL}/classes`)
}

export const getListTeacher = () => {
  return request(`${API_URL}/users/getTeacher`)
}

export const createClass = (payload: ParamType) => {
  return request(`${API_URL}/classes/create`, {
    method: 'POST',
    data: payload.data,
  })
}

export const updateClass = (payload: ParamType) => {
  return request(`${API_URL}/classes/update/${payload.id}`, {
    method: 'PUT',
    data: payload.data,
  })
}

export const deleteClass = (payload: ParamType) => {
  return request(`${API_URL}/classes/delete`, {
    method: 'DELETE',
    data: payload.data
  })
}

