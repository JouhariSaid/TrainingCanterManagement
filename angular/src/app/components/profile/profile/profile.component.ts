import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(
    public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(this.userService.currentUser?.role != 'Admin') {
      this.user = this.userService.currentUser;
      return;
    }
    this.userService.getUser(this.activatedRoute.snapshot.params['userId']).subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }

  updateProfile() {
    this.router.navigateByUrl("/client/update-profile")
  }
}
