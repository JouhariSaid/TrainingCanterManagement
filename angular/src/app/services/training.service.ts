import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Training} from "../components/model/training.model";
import {Observable} from "rxjs";
import {CommentModel} from "../components/model/comment.model";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseUrl="http://localhost:8585";
  constructor(
    private http: HttpClient
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

  downloadListOfParticipants(trainingId: number) {
    return this.http.get(`${this.baseUrl}/participants/${trainingId}`, {
      responseType: 'arraybuffer' as 'blob'
    });
  }

}
