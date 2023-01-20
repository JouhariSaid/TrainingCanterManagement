import { Component, OnInit } from '@angular/core';
import {Training} from "../model/training.model";
import {TrainingService} from "../../services/training.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {map} from "rxjs";
import {ImageProcessingService} from "../../services/image-processing.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trainings: Training[] = [];

  constructor(
    private trainingService: TrainingService,
    private userService: UserService,
    private router: Router,
    private imageProcessingService: ImageProcessingService,
  ) { }

  ngOnInit(): void {
    this.handleGetTrainings();
  }

  handleGetTrainings() {
    this.trainingService.getTrainings()
      .pipe(map((x:Training[], i) => x.map((training :Training) => this.imageProcessingService.createImages(training))))
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
    this.userService.addParticipantToTraining(training).subscribe({
      next: (t) => {
        alert("Congrats! You have successfully enrolled " + t.name + " training.");
      },
      error: (err) => alert("Not enrolled!")
    })
  }
}
