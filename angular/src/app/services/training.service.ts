import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Training} from "../components/model/training.model";
import {Observable} from "rxjs";
import {CommentModel} from "../components/model/comment.model";
import {UserService} from "./user.service";
import {RequestModel} from "../components/model/request.model";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseUrl="http://localhost:8585";
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {

  }

  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.baseUrl}/trainings`);
  }

  getTraining(trainingId: number): Observable<Training> {
    return this.http.get<Training>(`${this.baseUrl}/trainings/${trainingId}`);
  }

  newTraining(training: FormData): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addtraining`, training);
  }

  updateTraining(trainingId: number, training: FormData): Observable<Object> {
    return this.http.put(`${this.baseUrl}/trainings/${trainingId}`, training)
  }

  deleteTraining(trainingId: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/trainings/${trainingId}`);
  }

  addParticipantToTraining(training: Training, userId: number): Observable<Training> {
    return this.http.put<Training>(`${this.baseUrl}/trainings/newparticipant/${training.trainingId}/${userId}`, training)
  }

  addCommentToTraining(comment: CommentModel): Observable<Training> {
    return this.http.put<Training>(`${this.baseUrl}/trainings/newcomment/${comment.training.trainingId}/${comment.commentId}`, comment.training)
  }

  addRequestToTraining(request: RequestModel): Observable<Training> {
    return this.http.put<Training>(`${this.baseUrl}/trainings/newrequest/${request.training.trainingId}/${request.requestId}`, request.training)
  }

  downloadListOfParticipants(trainingId: number) {
    return this.http.get(`${this.baseUrl}/participants/${trainingId}`, {
      responseType: 'arraybuffer' as 'blob'
    });
  }

}
