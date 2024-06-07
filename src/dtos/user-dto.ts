
export interface IUser {
  _id: string;
  username: string;
  email: string;
  image: string;
  createdAt: any;
  updatedAt: any; 
};

export interface ICreateUser {
  username: string;
  email: string;
};

export type TUpdateProfile = {
  username?: string
  image?: string,
}