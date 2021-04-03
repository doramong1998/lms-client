export type Account = {
  id?: number,
  idUser?: string,
  fullName?: string,
  gender?: string,
  dob?: string,
  idClass?: string,
  studentId?: string,
  address?: string,
  phone?: string,
  email?: string,
  permissionId?: number,
  avatar?: string,
  status?: boolean,
  username?: string,
}

export type ListAccount = {
  status?: number,
  data?: [],
  message?: string
}

export type AccountT = {
  listAccount: ListAccount,
  listClass: any,
}
