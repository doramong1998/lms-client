import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getListAccount = () => {
  return request(`${API_URL}/users`)
}

export const getListClass = () => {
  return request(`${API_URL}/classes`)
}

export const createAccount = (payload: ParamType) => {
  return request(`${API_URL}/users/create`, {
    method: 'POST',
    data: payload.data,
  })
}

export const updateAccount = (payload: ParamType) => {
  return request(`${API_URL}/users/update/${payload.id}`, {
    method: 'PUT',
    data: payload.data,
  })
}

export const deleteAccount = (payload: ParamType) => {
  return request(`${API_URL}/users/delete`, {
    method: 'DELETE',
    data: payload.data
  })
}

