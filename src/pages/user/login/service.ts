import request from 'umi-request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
};

export const login = async (payload: ParamType) => {
  return request(`${API_URL}/get-access-token`, {
    method: 'POST',
    data: payload.data,
  })
}
