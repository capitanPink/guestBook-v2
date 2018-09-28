import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';

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
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true } // <-- debugging purposes only
    // )
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}