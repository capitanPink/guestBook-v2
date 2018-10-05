import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { GuestBookService } from '../../services/guest-book.service';
import { ICommentObject } from '../../../../shared/interfaces/i-comment-object';

@Component({
  selector: 'app-guest-search',
  templateUrl: './guest-search.component.html',
  styleUrls: ['./guest-search.component.scss']
})
export class GuestSearchComponent implements OnInit {

  commentObject: ICommentObject[] = []; 
  constructor(private guestBookService: GuestBookService) {}

  ngOnInit() {
    this.guestBookService.getComments()
      .pipe(map((response: any) => response.json().comments))
      .subscribe(
        (commentObject: any) => {
          this.commentObject = commentObject;
          console.log('this.commentObject', commentObject);
        },
        (error: Response) => console.log(`Error was raised during GET COMMENTS request ${error}`)
      );
  }
}