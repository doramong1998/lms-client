import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getCalendar = () => {
  return request(`${API_URL}/calendar`)
}

export const createCalendar = (payload: ParamType) => {
  return request(`${API_URL}/calendar/addCalendar`, {
    method: 'POST',
    data: payload.data,
  })
}

export const deleteCalendar = (payload: ParamType) => {
  return request(`${API_URL}/calendar/deleteCalendar`, {
    method: 'DELETE',
    data: payload.data,
  })
}
export const updateCalendar = (payload: ParamType) => {
  return request(`${API_URL}/calendar/updateCalendar`, {
    method: 'PUT',
    data: payload.data,
  })
}