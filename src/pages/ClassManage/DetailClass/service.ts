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

export const changeTeacherClass = (payload: ParamType) => {
  return request(`${API_URL}/classes/changeTeacherClass`,{
    method: 'POST',
    data: payload.data,
  } )
}

export const deleteStudentFromClass = (payload: ParamType) => {
  return request(`${API_URL}/classes/deleteStudentFromClass`,{
    method: 'DELETE',
    data: payload.data,
  } )
}

export const getPointStudent = (payload: ParamType) => {
  return request(`${API_URL}/classes/getPointStudent`,{
    method: 'POST',
    data: payload.data
  })
}

export const getClassBytStudent = (payload: ParamType) => {
  return request(`${API_URL}/classes/getClassBytStudent`,{
    method: 'POST',
    data: payload.data
  })
}