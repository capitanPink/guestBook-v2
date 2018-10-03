import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPostObject } from '../../../shared/interfaces/i-post-object';
import { paths } from './../../../shared/paths/paths.dev';

@Injectable()
export class HeroService {

  baseUrl: string = paths.common;
  commentsUrl: string = paths.comments;
  constructor(private http: Http) {}

  submitComment(postObject: IPostObject) {
    this.http.post(`${this.baseUrl}${this.commentsUrl}`, postObject);
  }
}