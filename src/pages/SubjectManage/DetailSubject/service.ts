import request from '@/utils/request'
import { API_URL } from '@/utils/utils'

type ParamType = {
  id?: number
  query?: string
  data?: any
}

export const getDetailSubject = (payload: ParamType) => {
  return request(`${API_URL}/subject/detail/${payload.id}`)
}

export const getListTeacher = () => {
  return request(`${API_URL}/users/getTeacher`)
}

export const getListStudent = () => {
  return request(`${API_URL}/users/getStudent`)
}

export const addStudentToSubject = (payload: ParamType) => {
  return request(`${API_URL}/subject/addStudentToSubject`,{
    method: 'POST',
    data: payload.data,
  } )
}

export const changeTeacherSubject = (payload: ParamType) => {
  return request(`${API_URL}/subject/changeTeacherSubject`,{
    method: 'POST',
    data: payload.data,
  } )
}

export const deleteStudentFromSubject = (payload: ParamType) => {
  return request(`${API_URL}/subject/deleteStudentFromSubject`,{
    method: 'DELETE',
    data: payload.data,
  } )
}

export const updatePoint = (payload: ParamType) => {
  return request(`${API_URL}/point/updatePoint`,{
    method: 'POST',
    data: payload.data,
  } )
}

export const getAttend = (payload: ParamType) => {
  return request(`${API_URL}/attend/getAttend`,{
    method: 'POST',
    data: payload.data,
  } )
}

export const postAttend = (payload: ParamType) => {
  return request(`${API_URL}/attend/postAttend`,{
    method: 'POST',
    data: payload.data,
  } )
}