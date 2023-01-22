import { Component, OnInit } from '@angular/core';
import {Training} from "../model/training.model";
import {TrainingService} from "../../services/training.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {map} from "rxjs";
import {ImageProcessingService} from "../../services/image-processing.service";
import {RequestService} from "../../services/request.service";
import {RequestModel} from "../model/request.model";
import {User} from "../model/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trainings: Training[] = [];

  constructor(
    private trainingService: TrainingService,
    public userService: UserService,
    private requestService: RequestService,
    private router: Router,
    private imageProcessingService: ImageProcessingService,
  ) { }

  ngOnInit(): void {
    this.handleGetTrainings();
  }

  handleGetTrainings() {
    this.trainingService.getTrainings()
      .pipe(map((x:Training[], i) => x.map((training :Training) => this.imageProcessingService.createImage(training))))
      .subscribe({
        next: (trainings) => {
          for(let training of trainings) {
            training.startDate = new Date(training.startDate);
            training.endDate = new Date(training.endDate);
            this.trainings.push(training)
          }
        }
      })
  }

  trainingDetails(trainingId: number) {
    this.router.navigateByUrl("/client/training-details/" + trainingId)
  }

  handleEnrollTraining(training: Training) {
    this.requestService.saveRequest(training).subscribe({
      next: (request) => {
        request.training = training;
        this.trainingService.addRequestToTraining(request).subscribe({
          next: (training) => {
            alert("Your request is saved successfully!");
          }
        })
      },
      error: (err) => alert("Not enrolled!")
    })
  }

  suggestTraining() {

  }

  alreadyEnrolled(training: Training) {
    return training.participants.includes(<User>training.participants.find(u => u.userId == this.userService.currentUser?.userId))
  }
}
