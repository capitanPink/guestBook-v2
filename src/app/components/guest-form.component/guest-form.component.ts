import { Component } from '@angular/core';
import { GuestFormService } from './../../services/guest-form.service';
import { IPostObject } from './../../../../shared/interfaces/i-post-object';
import { ResponseObject } from 'openapi3-ts';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss'],
  providers: [GuestFormService]
})
export class GuestFormComponent {

  postObject: IPostObject = {
    firstName: '',
    lastName: '',
    email: '',
    commentText: ''
  }

  constructor(private guestFormService: GuestFormService) {}

  submit(postObject: IPostObject) {
    console.log(`The post Object ${postObject}`);
    this.guestFormService.submitComment(postObject)
      .subscribe(
        (response: any) => console.log(`Response: ${response}`),
        (error: ResponseObject) => console.log(`Error was raised: ${error}`)
      );
  }
}