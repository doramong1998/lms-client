export type Class = {
  id?: number,
  idClass?: string,
  name?: string,
  studentNum?: number,
  fileNum?: number,
  idTeacher?: string,
  students?: string,
  files?: string,
  status?: string,
  teacher?: any,
}

export type ListClass = {
  status?: number,
  data?: [],
  message?: string
}

export type ClassT = {
  listClass: ListClass,
  listTeacher: any,
}
