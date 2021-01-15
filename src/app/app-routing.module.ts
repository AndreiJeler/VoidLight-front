import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountActivationComponent } from './components/register/account-activation/account-activation.component';
import { LoginComponent } from '../app/components/login/login.component';
import { NewsfeedComponent } from './components/newsfeed/newsfeed.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { AchievementsComponent } from '../app/components/achievements/achievements.component';
import {SteamReturnComponent} from "./components/steam-return/steam-return.component";
import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'login', component: LoginComponent},
  { path: 'newsfeed', component: NewsfeedComponent },
  { path: 'post', component: PostComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account-activation', component: AccountActivationComponent },
  { path: 'achievements/:id', component: AchievementsComponent },
  { path: 'steam-return', component: SteamReturnComponent },
  { path: '', component: HomescreenComponent},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
