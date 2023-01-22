import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {RequestModel} from "../components/model/request.model";
import {Observable} from "rxjs";
import {Training} from "../components/model/training.model";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl="http://localhost:8585";
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {

  }

  getRequests(): Observable<RequestModel[]> {
    return this.http.get<RequestModel[]>(`${this.baseUrl}/requests`);
  }

  saveRequest(training: Training): Observable<RequestModel> {
    let request: RequestModel = {
      requestId: 0,
      user: this.userService.currentUser!,
      training: training,
      accepted: false
    }
    return this.http.post<RequestModel>(`${this.baseUrl}/addrequest`, request);
  }

  updateRequest(request: RequestModel): Observable<RequestModel> {
    return this.http.put<RequestModel>(`${this.baseUrl}/requests/${request.requestId}`, request);
  }

}
