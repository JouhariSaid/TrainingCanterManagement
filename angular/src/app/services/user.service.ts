import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../components/model/user.model";
import {ValidationErrors} from "@angular/forms";
import {Training} from "../components/model/training.model";
import {CommentModel} from "../components/model/comment.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl="http://localhost:8585";
  currentUser: User | undefined;
  admin: User = {
    userId: 0,
    name: "ADMIN",
    email: "admin@gmail.com",
    phone: "",
    role: "Admin",
    domains: [],
    password: "admin123Z",
    deleted: false
  }

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users/role/${role}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/auth/${email}`);
  }

  saveUser(user: User): Observable<Object> {
    return this.http.post(`${this.baseUrl}/adduser`, user);
  }

  updateUser(): Observable<Object> {
    return this.http.put(`${this.baseUrl}/users/${this.currentUser?.userId}`, this.currentUser);
  }

  deleteUser(user: User): Observable<Object> {
    return this.http.put(`${this.baseUrl}/users/${user.userId}`, user);
  }

  addParticipantToTraining(training: Training): Observable<Training> {
    return this.http.put<Training>(`${this.baseUrl}/trainings/newparticipant/${training.trainingId}/${this.currentUser?.userId}`, training)
  }

  addCommentToTraining(comment: CommentModel): Observable<Training> {
    return this.http.put<Training>(`${this.baseUrl}/trainings/newcomment/${comment.training.trainingId}/${comment.commentId}`, comment.training)
  }

  logout(): Observable<boolean> {
    this.currentUser = undefined;
    return of(true);
  }

  getErrorMessage(fieldName: string, errors: ValidationErrors): string {
    if(errors['required']) {
      return fieldName + " is required";
    } else if(errors['minlength']) {
      return fieldName + " should have at least " + errors['minlength']['requiredLength'] + " characters";
    } else if(errors['email']) {
      return "Enter a valid email address";
    } else if(errors['confirmPasswordValidator']) {
      return "Password and Confirm Password didn't match.";
    } else {
      return "";
    }
  }

}
