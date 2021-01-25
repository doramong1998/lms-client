import request from 'umi-request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const forgot = async (payload: ParamType) => {
  return request(`${API_URL}/admin/auth/forgot-password`, {
    method: 'POST',
    data: payload.data,
  })
}
