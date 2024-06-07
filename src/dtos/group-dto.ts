import mongoose from "mongoose"
import { IUser } from "./user-dto"
import { IMessage } from "./message-dto";

export interface IGroup {
  _id: string;
  name: String;
  image: String;
  owner: IUser;
  members: IUser[];
  messages: IMessage[];
  createdAt: any;
  updatedAt: any;
};

export type TCreateGroup = {
  name: string,
  image: string,
};

export type TInviteGroup = {
  receiver: string,
  group: string,
}

export type TJoinGroup = {
  groupId: string,
}