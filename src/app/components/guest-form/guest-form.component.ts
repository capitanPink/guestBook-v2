import { Component } from '@angular/core';
import { GuestBookService } from '../../services/guest-book.service';
import { IPostObject } from './../../../../shared/interfaces/i-post-object';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss']
})
export class GuestFormComponent {

  postObject: IPostObject = {
    firstName: '',
    lastName: '',
    email: '',
    commentText: ''
  }

  constructor(private guestBookService: GuestBookService) {}

  submit(postObject: IPostObject) {
    this.guestBookService.submitComment(postObject)
      .subscribe(
        (response: any) => console.log(`Response: ${response}`),
        (error: Response) => console.log(`Error was raised: ${error}`)
      );
  }
}