export type Account = {
  message?: string;
  data?: {
    id?: number;
    idUser?: string;
    lastName?: string;
    firstName?: string;
    gender?: string;
    dob?: string;
    class?: string;
    studentId?: string;
    address?: string;
    phone?: string;
    email?: string;
    permission?: string;
    avatar?: string;
  };
  status?: number;
};

export type AccountT = {
  detailAccount: Account
};
