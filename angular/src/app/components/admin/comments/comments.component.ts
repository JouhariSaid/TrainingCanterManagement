import { Component, OnInit } from '@angular/core';
import {CommentModel} from "../../model/comment.model";
import {CommentService} from "../../../services/comment.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: CommentModel[] = [];
  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.commentService.getComments().subscribe({
      next: (comments) => {
        this.comments = comments.filter(c => !c.validated);
      }
    })
  }

  handleValidateComment(comment: CommentModel) {
    comment.validated = true;
    this.commentService.updateComment(comment).subscribe({
      next: (comment) => {
        alert("validated");
        this.comments = this.comments.filter(c => c.commentId != comment.commentId)
      }
    })
  }

  handleDeleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (data) => {
        alert("deleted");
        this.comments = this.comments.filter(c => c.commentId != commentId);
      }
    })
  }
}
