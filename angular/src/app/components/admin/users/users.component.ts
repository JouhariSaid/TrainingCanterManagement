import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users!: User[];
  role: string = "All Users";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.handleGetUsers()
  }

  handleGetUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.role = "All Users";
        this.users = users;
      }
    });
  }

  handleGetUsersByRole(role: string) {
    this.role = role == "Trainer" ? "List of trainers" : "List of Students";
    this.userService.getUsersByRole(role).subscribe({
      next: (users) => {
        this.users = users;
      }
    });
  }

  handleDeleteUser(user: User) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    user.deleted = true;
    this.userService.deleteUser(user).subscribe({
      next: (data) => {
        this.users = this.users.filter(u => u.userId != user.userId);
      }
    })
  }
}
