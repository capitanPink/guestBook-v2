import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { IPostObject } from '../../../shared/interfaces/i-post-object';
import { paths } from '../../../shared/paths/paths.dev';
import { ICommentObject } from './../../../shared/interfaces/i-comment-object';

@Injectable()
export class GuestBookService {

  private _baseUrl: string = paths.commonBE + paths.apiV2;
  private _commentsUrl: string = paths.comments;

  private _commentsList: ICommentObject[];
  private _commentsObject: BehaviorSubject<ICommentObject[]> = new BehaviorSubject<ICommentObject[]>([]);
  private _submitObject: BehaviorSubject<IPostObject> = new BehaviorSubject<any>(null);
  
  constructor(private http: Http) {}

  submitComment(postObject: IPostObject): any {
    this._submitObject.next(postObject);
    return this.http.post(`${this._baseUrl}${this._commentsUrl}`, postObject);
  }

  getComments(params: string = ''): Observable<any> {
    return this.http.get(`${this._baseUrl}${this._commentsUrl}${params}`);
  }

  subscribeToComments() {
    return this._commentsObject.asObservable();
  }

  subscribeToSubmit(): Observable<IPostObject> {
    return this._submitObject.asObservable();
  }

  set commentsList(commentList: ICommentObject[]) {
    this._commentsList = commentList;
    this._commentsObject.next(commentList);
  }

}

type TCommentList = ICommentObject[];