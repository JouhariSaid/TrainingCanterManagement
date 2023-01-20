import { Component, OnInit } from '@angular/core';
import {Training} from "../../model/training.model";
import {TrainingService} from "../../../services/training.service";
import {Router} from "@angular/router";
import * as fs from 'file-saver';
import {User} from "../../model/user.model";

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  trainings: Training[] = [];
  errorMessage: string = "";


  constructor(
    private trainingService: TrainingService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.handleGetTrainings();
  }

  handleGetTrainings() {
    this.trainings = [];
    this.trainingService.getTrainings().subscribe({
      next: (trainings) => {
        for(let training of trainings) {
          training.startDate = new Date(training.startDate);
          training.endDate = new Date(training.endDate);
          this.trainings.push(training)
        }
      }
    })
  }

  newTraining() {
    this.router.navigateByUrl("/admin/newtraining")
  }

  handleDeleteTraining(trainingId: number) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.trainingService.deleteTraining(trainingId).subscribe({
      next: (data) => {
        this.trainings = this.trainings.filter(t => t.trainingId != trainingId);
      }
    });
  }

  handleDownloadListOfParticipants(training: Training) {
    this.trainingService.downloadListOfParticipants(training.trainingId).subscribe(
      (data) => {
      let file = new Blob([data], {
        type: 'application/vnd.ms-excel',
      });
      fs.saveAs(file, `training${training.trainingId}_participants.xlsx`);
    })
  }

  trainingDetails(trainingId: number) {
    this.router.navigateByUrl("/admin/training-details/" + trainingId)
  }

  trainerProfile(userId: number) {
    this.router.navigateByUrl("admin/training/trainer/" + userId);
  }
}
