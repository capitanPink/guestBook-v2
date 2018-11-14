import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ReversePipe } from './../../shared/pipes/reverse-array.pipe';
import { GuestBookService } from './../../services/guest-book.service';
import { ICommentObject } from './../../../../shared/interfaces/i-comment-object';
import { IPostObject } from '../../../../shared/interfaces/i-post-object';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss']
})
export class GuestListComponent implements OnInit, OnDestroy {

  private comments: ICommentObject[] = [];

  private _subscriptions: Subscription[] = [];
  constructor(private guestBookService: GuestBookService,
              private _reversePipe: ReversePipe) {}

  ngOnInit() {
    const commentsSubscription =
                this.guestBookService
                    .subscribeToComments()
                    .subscribe((comments: ICommentObject[]) => this.setComments(this._reversePipe.transform(comments)));
    const postSubscription =
                this.guestBookService
                    .subscribeToSubmit()
                    .subscribe((postObject: IPostObject) => this.addComment(postObject));
    this._subscriptions.push(commentsSubscription, postSubscription);
  }

  setComments(comments: ICommentObject[]) {
    this.comments = [...comments];
  }

  addComment(comment: IPostObject): void {
    this.comments = [comment].concat(this.comments);
  }

  ngOnDestroy() {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

} 