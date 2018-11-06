import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GuestModule } from './components/guest.module';
import { GuestComponent } from './components/guest/guest.component';


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
    GuestModule
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true } // <-- debugging purposes only
    // )
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}