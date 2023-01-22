import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/admin/nav-bar/nav-bar.component';
import { UsersComponent } from './components/admin/users/users.component';
import { TrainingsComponent } from './components/admin/trainings/trainings.component';
import {HttpClientModule} from "@angular/common/http";
import { NewTrainingComponent } from './components/admin/new-training/new-training.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateTrainingComponent } from './components/admin/update-training/update-training.component';
import { TrainingDetailsComponent } from './components/client/training-details/training-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CommentsComponent } from './components/admin/comments/comments.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile.component';
import { TrainingRequestsComponent } from './components/admin/training-requests/training-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UsersComponent,
    TrainingsComponent,
    NewTrainingComponent,
    UpdateTrainingComponent,
    TrainingDetailsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CommentsComponent,
    ProfileComponent,
    UpdateProfileComponent,
    TrainingRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule{ }
