export type Subject = {
  id?: number,
  idSubject?: string,
  name?: string,
  studentNum?: number,
  fileNum?: number,
  idTeacher?: string,
  code?: string,
  status?: string,
  teacher?: any,
  totalStudent?: number,
}

export type ListSubject = {
  status?: number,
  data?: [],
  message?: string
}

export type SubjectT = {
  listSubject: ListSubject,
  listTeacher: any,
}
