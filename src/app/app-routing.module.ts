import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from '../app/components/login/login.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'post', component: PostComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
