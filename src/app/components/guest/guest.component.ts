import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { GuestBookService } from './../../services/guest-book.service';
import { ICommentObject } from '../../../../shared/interfaces/i-comment-object';
import { SearchObjectModel } from './../../../../shared/models/search-object.model';
import { IPostObject } from './../../../../shared/interfaces/i-post-object';
import { ISearchObject } from '../../../../shared/interfaces/i-search-object';
import { FormatterUtil } from '../../../../rest/api/v2/core/utils/formatter.util';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent {

  firstName: String;
  searchObject: SearchObjectModel = new SearchObjectModel();

  constructor(private guestBookService: GuestBookService) {}

  submit(postObject: IPostObject) {
    this.guestBookService.submitComment(postObject)
      .subscribe(
        (response: Response) => {},
        (error: Response) => console.log(`Error was raised: ${error}`)
      );
  }

  get(searchObject: ISearchObject) {
    const params = FormatterUtil.objectToParams(searchObject);
    this.guestBookService.getComments(params)
      .subscribe((commentList: any) => {
          this.guestBookService.commentsList = commentList;
      },
        (error: Response) => console.log(`Error was raised during GET COMMENTS request ${error}`)
      );
  }
}