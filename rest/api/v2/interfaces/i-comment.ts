import { IUser } from "./i-user";

export interface IComment {
  id?: number;
  commentText: string;
  userEmail?: string;
  user: IUser;
}