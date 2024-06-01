
export interface IUser {
  _id: string;
  username: string;
  email: string;
  createdAt: any;
  updatedAt: any; 
};

export interface ICreateUser {
  username: string;
  email: string;
};