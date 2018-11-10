import { IComment } from "./i-comment";

export class IUser {
  firstName: string;
  lastName: string;
  email: string;
  comments: IComment[];
};