export type Class = {
  id?: number,
  idClass?: string,
  name?: string,
  studentNum?: number,
  fileNum?: number,
  idTeacher?: string,
  students?: any,
  files?: number,
  status?: string,
  teacher?: any,
  totalStudent?: number,
}

export type ListClass = {
  status?: number,
  data?: Class,
  message?: string
}

export type ClassT = {
  detailClass: ListClass,
  listTeacher: any,
  listStudent: any,
  pointStudent: any,
  listClassStudent: any,
}
