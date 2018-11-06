import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { IPostObject } from './../../../../shared/interfaces/i-post-object';
import { SearchFormModel } from './../../../../shared/models/search-form-model';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss']
})
export class GuestFormComponent {

  @Input() submitComment: (postObject: IPostObject) => Observable<Array<Object>>;

  postObject: IPostObject = new SearchFormModel();

  constructor() {}
}