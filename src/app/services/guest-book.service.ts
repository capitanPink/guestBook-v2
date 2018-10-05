import { ICommentObject } from './../../../shared/interfaces/i-comment-object';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPostObject } from '../../../shared/interfaces/i-post-object';
import { paths } from '../../../shared/paths/paths.dev';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GuestBookService {

  baseUrl: string = paths.commonBE + paths.apiV2;
  commentsUrl: string = paths.comments;
  
  constructor(private http: Http) {}

  submitComment(postObject: IPostObject): Observable<Object> {
    return this.http.post(`${this.baseUrl}${this.commentsUrl}`, postObject);
  }

  getComments(): Observable<Object> {
    return this.http.get(`${this.baseUrl}${this.commentsUrl}`);
  }
}