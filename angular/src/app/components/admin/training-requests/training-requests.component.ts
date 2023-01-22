import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../../services/request.service";
import {RequestModel} from "../../model/request.model";
import {TrainingService} from "../../../services/training.service";

@Component({
  selector: 'app-training-requests',
  templateUrl: './training-requests.component.html',
  styleUrls: ['./training-requests.component.css']
})
export class TrainingRequestsComponent implements OnInit {
  requests: RequestModel[] = [];

  constructor(
    private requestService: RequestService,
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.requestService.getRequests().subscribe({
      next: (requests) => {
        this.requests = requests;
        console.log(requests)
      }
    })
  }

  acceptRequest(request: RequestModel) {
    this.trainingService.addParticipantToTraining(request.training, request.user.userId).subscribe({
      next: (training) => {
        this.requestService.updateRequest(request).subscribe({
          next: (request) => {
            alert("Request accepted!");
            this.requests = this.requests.filter(r => r.requestId != request.requestId);
          }
        })
      },
      error: (err) => alert("Not enrolled!")
    })
  }

  rejectRequest(userId: number) {

  }

}
