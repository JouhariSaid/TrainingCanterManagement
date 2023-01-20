import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userService: UserService
  ) {
    this.registerFormGroup = this.fb.group(
      {
        name: this.fb.control("", [Validators.required]),
        role: this.fb.control("", [Validators.required]),
        email: this.fb.control("", [Validators.required, Validators.email]),
        phone: this.fb.control("", [Validators.required]),
        password: this.fb.control("", [Validators.required, Validators.minLength(6)]),
        confirmPassword: this.fb.control("", [Validators.required])
      }, {
        validator: this.ConfirmPasswordValidator("password", "confirmPassword")
      }
    )
  }
  ngOnInit(): void {
  }

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];

      if(matchingControl.errors && !matchingControl.errors['confirmPasswordValidator']) {
        return;
      }
      if(control.value !== matchingControl.value) {
        matchingControl.setErrors({
          confirmPasswordValidator: true
        });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  handleRegister() {
    this.userService.saveUser(this.registerFormGroup.value).subscribe({
      next: (user) => {
        this.router.navigateByUrl("/admin/trainings")
      }
    })
  }
}
