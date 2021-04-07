import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getListSubject = () => {
  return request(`${API_URL}/subject`)
}

export const getListTeacher = () => {
  return request(`${API_URL}/users/getTeacher`)
}

export const createSubject = (payload: ParamType) => {
  return request(`${API_URL}/subject/create`, {
    method: 'POST',
    data: payload.data,
  })
}

export const updateSubject = (payload: ParamType) => {
  return request(`${API_URL}/subject/update/${payload.id}`, {
    method: 'PUT',
    data: payload.data,
  })
}

export const deleteSubject = (payload: ParamType) => {
  return request(`${API_URL}/subject/delete`, {
    method: 'DELETE',
    data: payload.data
  })
}

