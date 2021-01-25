import request from '@/utils/request'
// import { API_URL } from '@/utils/utils

// export const getThemes = async () => {
//   return request(`${API_URL}/ldpage`)
// }

export const getThemes = async () => {
  return request(`/api/themes`)
}

export const getTabs = async () => {
  return request(`/api/tabs`)
}
