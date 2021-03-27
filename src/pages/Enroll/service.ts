import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getLandingPage = () => {
  return request(`${API_URL}/ldpage`)
}

export const createLandingPage = (payload: ParamType) => {
  return request(`${API_URL}/ldpage`, {
    method: 'POST',
    data: payload.data,
  })
}

export const editLandingPage = (payload: ParamType) => {
  return request(`${API_URL}/admin/news/${payload.id}`, {
    method: 'PATCH',
    data: payload.data,
  })
}

export const deleteLandingPage = (payload: ParamType) => {
  return request(`${API_URL}/admin/news/${payload.id}`, {
    method: 'DELETE',
  })
}

export const deleteMultiLandingPage = (payload: ParamType) => {
  return request(`${API_URL}/admin/news${payload.query}`, {
    method: 'DELETE',
  })
}
