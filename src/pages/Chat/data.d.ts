export type File = {
  id?: number,
  idFile?: string,
  name?: string,
  type?: string,
  url?: string,
  status?: boolean,
  idUser?: string,
}

export type ListFile = {
  status?: number,
  data?: [],
  message?: string
}

export type FileT = {
  listFile: ListFile,
}
