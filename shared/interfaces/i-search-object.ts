import { IPostObject } from './i-post-object';

export interface ISearchObject extends IPostObject {
    commentsPerPage: number;
}