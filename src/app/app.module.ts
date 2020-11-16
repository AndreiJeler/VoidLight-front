import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
