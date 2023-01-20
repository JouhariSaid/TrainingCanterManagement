import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleLogout() {
    this.userService.logout().subscribe({
      next: (data) => {
        this.router.navigateByUrl("/login")
      }
    })
  }

  showProfile() {
    this.router.navigateByUrl("/client/profile");
  }
}
