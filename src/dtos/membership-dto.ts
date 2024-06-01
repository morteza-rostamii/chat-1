import mongoose from "mongoose";
import { IUser } from "./user-dto";
import { IGroup } from "./group-dto";

export interface IMembership {
  _id: string;

  group: IGroup;
  user: IUser;
  role: 'member' | 'owner';
  joinedAt: Date; 
  createdAt: Date; 
  updatedAt: Date; 
};