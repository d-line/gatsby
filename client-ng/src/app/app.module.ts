import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { FeedsComponent } from './feeds/feeds.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoriesComponent } from './stories/stories.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { NewFeedComponent } from './new-feed/new-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    FeedsComponent,
    StoriesComponent,
    ActionBarComponent,
    NewFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
