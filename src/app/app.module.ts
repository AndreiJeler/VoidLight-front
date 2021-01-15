import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AccountActivationComponent } from './components/register/account-activation/account-activation.component';
import { CreatePostComponent } from './components/newsfeed/modals/create-post/create-post.component';
import { FavoriteGameComponent } from './components/profile/favorite-game/favorite-game.component';
import { FriendComponent } from './components/friend/friend.component';
import { LoginComponent } from './components/login/login.component';
import { NewsfeedComponent } from './components/newsfeed/newsfeed.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { AchievementItemComponent } from './components/achievements/achievement-item/achievement-item.component';

import { GalleryModule } from 'ng-gallery';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FriendRequestsComponent } from './components/newsfeed/modals/friend-requests/friend-requests.component';
import { CommonModule } from '@angular/common';
import { HomescreenComponent } from './components/homescreen/homescreen.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    FavoriteGameComponent,
    FriendComponent,
    LoginComponent,
    NewsfeedComponent,
    PostComponent,
    ProfileComponent,
    RegisterComponent,
    AccountActivationComponent,
    AchievementsComponent,
    AchievementItemComponent,
    FriendRequestsComponent,
    HomescreenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GalleryModule,
    HttpClientModule,
    NoopAnimationsModule,
    ModalModule.forRoot(),
    NgSelectModule,
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
