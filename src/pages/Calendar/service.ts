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
