import { ICommentObject } from './../../../../shared/interfaces/i-comment-object';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss']
})
export class GuestListComponent implements OnInit {

  @Input('comments') comments: ICommentObject[] = [];
  constructor() {}

  ngOnInit() {
    console.log('comments', this.comments);
  }
} 