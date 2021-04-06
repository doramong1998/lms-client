import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getDetailClass = (payload: ParamType) => {
  return request(`${API_URL}/classes/detail/${payload.id}`)
}

export const getListTeacher = () => {
  return request(`${API_URL}/users/getTeacher`)
}

export const getListStudent = () => {
  return request(`${API_URL}/users/getStudent`)
}

export const addStudentToClass = (payload: ParamType) => {
  return request(`${API_URL}/classes/addStudentToClass`,{
    method: 'POST',
    data: payload.data,
  } )
}

