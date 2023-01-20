import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateProfileFormGroup!: FormGroup;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateProfileFormGroup = this.fb.group({
      "name": this.fb.control(this.userService.currentUser?.name),
      "email": this.fb.control(this.userService.currentUser?.email),
      "phone": this.fb.control(this.userService.currentUser?.phone),
    })
  }

  handleUpdateProfile() {
    this.userService.currentUser!.name = this.updateProfileFormGroup.value.name;
    this.userService.currentUser!.email = this.updateProfileFormGroup.value.email;
    this.userService.currentUser!.phone = this.updateProfileFormGroup.value.phone;
    this.userService.updateUser().subscribe({
      next: (data) => {
        alert("Your profile was updated successfully !")
        this.router.navigateByUrl("/client/profile")
      }
    })
  }
}
