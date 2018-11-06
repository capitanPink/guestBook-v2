import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { IPostObject } from '../../../shared/interfaces/i-post-object';
import { paths } from '../../../shared/paths/paths.dev';

@Injectable()
export class GuestBookService {

  baseUrl: string = paths.commonBE + paths.apiV2;
  commentsUrl: string = paths.comments;
  
  constructor(private http: Http) {}

  submitComment(postObject: IPostObject): any {
    return this.http.post(`${this.baseUrl}${this.commentsUrl}`, postObject);
  }

  getComments(params: string = ''): any {
    return this.http.get(`${this.baseUrl}${this.commentsUrl}${params.length ? `?${params}`: ``}`);
  }
}