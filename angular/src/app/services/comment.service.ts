import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommentModel} from "../components/model/comment.model";
import {Observable} from "rxjs";
import {Comment} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = "http://localhost:8585";

  constructor(
    private httpClient: HttpClient
  ) { }

  getComments(): Observable<CommentModel[]> {
    return this.httpClient.get<CommentModel[]>(`${this.baseUrl}/comments`);
  }

  saveComment(comment: CommentModel): Observable<CommentModel> {
    return this.httpClient.post<CommentModel>(`${this.baseUrl}/addcomment`, comment);
  }

  updateComment(comment: CommentModel): Observable<CommentModel> {
    return this.httpClient.put<CommentModel>(`${this.baseUrl}/comments/${comment.commentId}`, comment);
  }

  deleteComment(commentId: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/comments/${commentId}`)
  }
}
