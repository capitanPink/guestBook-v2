import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuestComponent } from './guest/guest.component';
import { GuestFormComponent } from './guest-form/guest-form.component';
import { GuestSearchComponent } from './guest-search/guest-search.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { GuestBookService } from '../services/guest-book.service';

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    GuestComponent,
    GuestFormComponent,
    GuestSearchComponent,
    GuestListComponent
  ],
  exports: [
    GuestComponent,
    GuestFormComponent,
    GuestSearchComponent,
    GuestListComponent
  ],
  bootstrap: [GuestComponent],
  providers: [GuestBookService]
})
export class GuestModule {}