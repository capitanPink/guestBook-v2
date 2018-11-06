import { SearchFormModel } from './../../../../shared/models/search-form-model';
import { Component, Input } from '@angular/core';

import { ISearchObject } from './../../../../shared/interfaces/i-search-object';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-guest-search',
  templateUrl: './guest-search.component.html',
  styleUrls: ['./guest-search.component.scss']
})
export class GuestSearchComponent {

  @Input() getQuery: (searchObject: ISearchObject) => Observable<Array<Object>>;

  searchObject: SearchFormModel = new SearchFormModel();

  constructor() {}
}