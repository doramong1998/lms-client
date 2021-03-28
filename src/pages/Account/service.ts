import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

export const getAccount = () => {
  return request(`${API_URL}/users/me`)
}