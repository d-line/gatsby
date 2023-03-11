import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedsComponent } from './feeds/feeds.component';
import { NewFeedComponent } from './new-feed/new-feed.component';
import { AuthGuard } from './shared/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { StoriesComponent } from './stories/stories.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'feeds', component: FeedsComponent, canActivate: [AuthGuard] },
  { path: 'feeds/new', component: NewFeedComponent, canActivate: [AuthGuard] },
  { path: 'stories', component: StoriesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
