import { IPostObject } from './i-post-object';

export interface ICommentObject extends IPostObject {
  comments: string[];
}