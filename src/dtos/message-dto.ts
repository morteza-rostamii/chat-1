import mongoose from "mongoose";
import { IUser } from "./user-dto";
import { IGroup } from "./group-dto";

export interface IMessage {
  _id: string;
  content: string;
  image: string,

  //@rel
  likes: IUser[],
  parent: IMessage,
  group: IGroup,
  sender: IUser,

  createdAt: Date;
  updatedAt: Date;
};

export type TCreateMessage = {
  groupId: string,
  message: string,
  image?: string,
};