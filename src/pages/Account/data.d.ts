export type Account = {
  message?: string;
  data?: {
    id?: number;
    idUser?: string;
    fullName?: string;
    gender?: string;
    dob?: string;
    class?: string;
    studentId?: string;
    address?: string;
    phone?: string;
    email?: string;
    permissionId?: string;
    avatar?: string;
    status?: boolean;
  };
  status?: number;
};

export type AccountT = {
  detailAccount: Account,
  listClass: any,
};
