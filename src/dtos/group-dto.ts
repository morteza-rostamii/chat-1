import mongoose from "mongoose"
import { IUser } from "./user-dto"

export interface IGroup {
  _id: string;
  name: String;
  owner: IUser;
  createdAt: any;
  updatedAt: any;
};