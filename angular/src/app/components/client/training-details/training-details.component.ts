import { Component, OnInit } from '@angular/core';
import {Training} from "../../model/training.model";
import {TrainingService} from "../../../services/training.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../../services/comment.service";
import {CommentModel} from "../../model/comment.model";
import {map} from "rxjs";
import {ImageProcessingService} from "../../../services/image-processing.service";

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent implements OnInit {
  training!: Training;
  commentFormGroup!: FormGroup;

  constructor(
    private trainingService: TrainingService,
    public userService: UserService,
    private commentService: CommentService,
    private router: Router,
    private imageProcessingService: ImageProcessingService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.commentFormGroup = this.fb.group({
      comment: this.fb.control(null, [Validators.required])
    })
    this.trainingService.getTraining(this.activatedRoute.snapshot.params['trainingId'])
      .subscribe({
      next: (training) => {
        this.training = training;
        this.imageProcessingService.createImages(training);
        this.training.comments = this.training.comments.filter(c => c.validated)
        this.training.comments.map(c => c.date = new Date(c.date));
        console.log(this.training)
      }
    })
  }

  handleEnrollTraining(training: Training) {
    this.userService.addParticipantToTraining(training).subscribe({
      next: (t) => {
        alert("Congrats! You have successfully enrolled " + t.name + " training.");
      },
      error: (err) => alert("Not enrolled!")
    })
  }

  handleSaveComment() {
    let comment: CommentModel = {
      commentId: 0,
      comment: this.commentFormGroup.value.comment as string,
      validated: false,
      date: new Date(),
      user: this.userService.currentUser!,
      training: this.training
    }
    if(comment.comment.trim() == "") {
      alert("You can't send a blank comment!");
      return;
    }
    this.commentService.saveComment(comment).subscribe({
      next: (res) => {
        comment.commentId = res.commentId;
        this.userService.addCommentToTraining(comment).subscribe({
          next: (training) => {
            alert("Your comment should be validated by the ADMIN before display it!")
          },
        })
      }
    })
  }

  updateTraining(trainingId: number) {
    this.router.navigateByUrl("/admin/updatetraining/" + trainingId)
  }
}
