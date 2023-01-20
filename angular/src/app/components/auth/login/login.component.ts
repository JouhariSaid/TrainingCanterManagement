import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userService: UserService
  ) {
    this.loginFormGroup = this.fb.group({
      email: this.fb.control("admin@gmail.com", [Validators.required, Validators.email]),
      password: this.fb.control("admin123Z", [Validators.required])
    })
  }

  ngOnInit(): void {

  }

  handleLogin() {
    let email = this.loginFormGroup.value.email;
    let password = this.loginFormGroup.value.password;

    if(email == "admin@gmail.com") {
      this.userService.currentUser = this.userService.admin;
      if(password == this.userService.currentUser.password) {
        this.router.navigateByUrl("/admin/trainings");
      }
    }

    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        if(!user) {
          this.errorMessage = "User not found";
        } else if(user.deleted) {
          this.errorMessage = "Your account was deleted by admin!";
        } else if(user.password != password) {
          this.errorMessage = "Email or password incorrect!";
        } else {
          this.userService.currentUser = user;
          this.router.navigateByUrl("/client/home");
        }
      },
      error: (err) => {
        this.errorMessage = "Something was wrong!"
      }
    });
  }
}
