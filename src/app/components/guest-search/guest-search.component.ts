import { SearchFormModel } from './../../../../shared/models/search-form-model';
import { Component, Input } from '@angular/core';

import { ISearchObject } from './../../../../shared/interfaces/i-search-object';
import { Observable } from 'rxjs';
import { GuestBookService } from '../../services/guest-book.service';
import { FormatterUtil } from '../../../../rest/api/v2/core/utils/formatter.util';

@Component({
  selector: 'app-guest-search',
  templateUrl: './guest-search.component.html',
  styleUrls: ['./guest-search.component.scss']
})
export class GuestSearchComponent {

  @Input() getQuery: (searchObject: ISearchObject) => Observable<Array<Object>>;

  searchObject: SearchFormModel = new SearchFormModel();
  _offset: number = 0;

  constructor(private _guestBookService: GuestBookService) {}

  previousComments(commentsPerPage: number) {
    this._offset -= commentsPerPage;
    const params = FormatterUtil.objectToParams({ commentsPerPage, offset: this._offset });
    this._guestBookService.getComments(params)
      .subscribe(
        (commentList: any) => this._guestBookService.commentsList = commentList,
        (error: Response) => console.log(`Error was raised during GET COMMENTS request ${error}`)
      );
  }

  nextComments(commentsPerPage: number) {
    this._offset += commentsPerPage;
    const params = FormatterUtil.objectToParams({ commentsPerPage, offset: this._offset });
    this._guestBookService.getComments(params)
      .subscribe(
        (commentList: any) => this._guestBookService.commentsList = commentList,
        (error: Response) => console.log(`Error was raised during GET COMMENTS request ${error}`)
      );
  }
}