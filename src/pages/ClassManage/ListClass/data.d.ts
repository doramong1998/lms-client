export type Class = {
  id?: number,
  idClass?: string,
  name?: string,
  studentNum?: number,
  fileNum?: number,
  idTeacher?: string,
  students?: string,
  files?: number,
  status?: string,
  teacher?: any,
  totalStudent?: number,
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
