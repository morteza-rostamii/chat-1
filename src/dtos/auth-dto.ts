
export interface IRegister {
  email: string;
};

export interface ILogin {
  otp: string;
  email: string;
};

export type TUpload = {
  formData: FormData | null,
};