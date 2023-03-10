import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TrainingService} from "../../../services/training.service";
import {Router} from "@angular/router";
import {Training} from "../../model/training.model";
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user.model";
import {UserService} from "../../../services/user.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FileHandle} from "../../model/file-handler.model";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  newTrainingFormGrop!: FormGroup;
  message!: string;
  file!: File;

  training: Training={
    trainingId: 0,
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    numberOfParticipants: 0,
    image: {
      file: {} as File,
      url: {}
    },
    price: 0,
    trainerAmount: 0,
    participants: [],
    comments: [],
    requests: [],
    trainer: {
      userId: 0,
      name: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      domains:[],
      deleted: false
    },
  };

  trainers!: User[];

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private http:HttpClient,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.userService.getUsersByRole('Trainer').subscribe({
      next: (trainers) => {
        this.trainers = trainers;
        this.newTrainingFormGrop = this.fb.group({
          trainer: this.fb.control(null, [Validators.required]),
          name: this.fb.control(null, [Validators.required]),
          description: this.fb.control(null, [Validators.required]),
          startDate: this.fb.control(null, [Validators.required]),
          endDate: this.fb.control(null, [Validators.required]),
          price: this.fb.control(null, [Validators.required]),
          trainerAmount: this.fb.control(null, [Validators.required]),
          numberOfParticipants: this.fb.control(null, [Validators.required]),
        })
      }
    })
  }

  handleNewTraining() {
    const trainingFormData = this.prepareFormData(this.training);
    this.trainingService.newTraining(trainingFormData).subscribe({
      next: (training) => {
        this.router.navigateByUrl("/admin/trainings")
      }
    })
  }


  prepareFormData(training: Training) : FormData{
    const formData = new FormData();
    formData.append(
      'training',
      new Blob([JSON.stringify(this.newTrainingFormGrop.value)], {type: 'application/json'})
    );

    formData.append(
      'imageFile',
      training.image.file,
      training.image.file.name
    );

    return formData;
  }

  onFileChanged({event}: { event: any }) {
    if(event.target.files) {
      const file = event.target.files[0];

      this.training.image = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      };

    }
  }

}
