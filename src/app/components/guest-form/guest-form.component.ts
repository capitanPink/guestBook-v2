import { Component, EventEmitter, Output } from '@angular/core';
import { GuestBookService } from '../../services/guest-book.service';
import { IPostObject } from './../../../../shared/interfaces/i-post-object';
import { forkJoin } from 'rxjs'
import { flatMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss']
})
export class GuestFormComponent {

  @Output() update: EventEmitter<any> = new EventEmitter();

  postObject: IPostObject = {
    firstName: '',
    lastName: '',
    email: '',
    commentText: ''
  }

  constructor(private guestBookService: GuestBookService) {}

  submit(postObject: IPostObject) {
    this.guestBookService.submitComment(postObject)
      // .pipe(mergeMap(() => this.guestBookService.getComments()))
      .subscribe(
        (response: any) => {
          console.log(`Response: ${response}`);
          this.update.emit();
        },
        (error: Response) => console.log(`Error was raised: ${error}`)
      );
  }
}