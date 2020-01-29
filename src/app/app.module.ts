import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';

import {UsersTableComponent} from './users/users-table/users-table.component';
import {HttpCallService} from './shared/services/http-call.service';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { SelectedUserComponent } from './users/selected-user/selected-user.component';
import {DataService} from './shared/services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    SelectedUserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HttpCallService,
    DataService,
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
