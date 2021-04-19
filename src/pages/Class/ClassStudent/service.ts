import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getDetailUserSubject = (payload: ParamType) => {
  return request(`${API_URL}/subject/getUserInSubject/${payload.id}`)
}

export const getListSubject = (payload: ParamType) => {
  return request(`${API_URL}/subject/getSubjectByMe`)
}