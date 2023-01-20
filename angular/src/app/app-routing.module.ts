import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavBarComponent} from "./components/admin/nav-bar/nav-bar.component";
import {UsersComponent} from "./components/admin/users/users.component";
import {TrainingsComponent} from "./components/admin/trainings/trainings.component";
import {NewTrainingComponent} from "./components/admin/new-training/new-training.component";
import {UpdateTrainingComponent} from "./components/admin/update-training/update-training.component";
import {TrainingDetailsComponent} from "./components/client/training-details/training-details.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {AuthGuard} from "./guards/auth.guard";
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile/profile.component";
import {UpdateProfileComponent} from "./components/profile/update-profile/update-profile.component";
import {CommentsComponent} from "./components/admin/comments/comments.component";


const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "admin",
    component: NavBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "trainings",
        component: TrainingsComponent,
      },
      {
        path: "training-details/:trainingId",
        component: TrainingDetailsComponent
      },
      {
        path: "newtraining",
        component: NewTrainingComponent
      },
      {
        path: "updatetraining/:trainingId",
        component: UpdateTrainingComponent
      },
      {
        path: "users",
        component: UsersComponent
      },
      {
        path: "comments",
        component: CommentsComponent
      }
    ]
  },
  {
    path: "client",
    component: NavBarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "training-details/:trainingId",
        component: TrainingDetailsComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "update-profile",
        component: UpdateProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
