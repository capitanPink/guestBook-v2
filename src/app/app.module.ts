import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import { GuestBookService } from './services/guest-book.service';
import { GuestSearchComponent } from './components/guest-search/guest-search.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';

// const appRoutes: Routes = [
//   {
//     path: '/',
//     component: AppComponent,
//     data: { title: 'Jack' }
//   }
// ];

@NgModule({
  imports:[
    BrowserModule,
    FormsModule,
    HttpModule
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true } // <-- debugging purposes only
    // )
  ],
  declarations: [
    AppComponent,
    GuestFormComponent,
    GuestSearchComponent,
    GuestListComponent
  ],
  bootstrap: [AppComponent],
  providers: [GuestBookService]
})
export class AppModule {}