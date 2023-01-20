import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  updateProfile() {
    this.router.navigateByUrl("/client/update-profile")
  }
}
