import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Training} from "../../model/training.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainingService} from "../../../services/training.service";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../../services/user.service";
import {ImageProcessingService} from "../../../services/image-processing.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-update-training',
  templateUrl: './update-training.component.html',
  styleUrls: ['./update-training.component.css']
})
export class UpdateTrainingComponent implements OnInit {
  updateTrainingFormGrop!: FormGroup;
  training!: Training;
  trainers!: User[];
  imageUpdated: boolean = false;

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private imageProcessingService: ImageProcessingService
  ) {

  }

  ngOnInit(): void {
    this.trainingService.getTraining(this.activatedRoute.snapshot.params['trainingId']).subscribe({
      next: (training) => {
        this.training = training;
        this.imageProcessingService.createImage(this.training);
        this.userService.getUsersByRole('Trainer').subscribe({
          next: (trainers) => {
            this.trainers = trainers.filter(t => t.userId != training.trainer.userId);
            this.updateTrainingFormGrop = this.fb.group({
              trainer: this.fb.control(this.training.trainer, [Validators.required]),
              name: this.fb.control(this.training.name, [Validators.required]),
              description: this.fb.control(this.training.description, [Validators.required]),
              startDate: this.fb.control(this.training.startDate, [Validators.required]),
              endDate: this.fb.control(this.training.endDate, [Validators.required]),
              price: this.fb.control(this.training.price, [Validators.required]),
              trainerAmount: this.fb.control(this.training.trainerAmount, [Validators.required])
            });
          }
        });
      }
    })
  }

  handleUpdateTraining() {
    const trainingFormData= this.prepareFormData(this.training);
    console.log(this.updateTrainingFormGrop.value.trainingId)
    this.trainingService.updateTraining(this.training.trainingId, trainingFormData).subscribe({
      next: (training) => {
        this.router.navigateByUrl("/admin/trainings")
      }
    })
  }

  prepareFormData(training: Training) : FormData{
    const formData = new FormData();
    formData.append(
      'training',
      new Blob([JSON.stringify(this.updateTrainingFormGrop.value)], {type: 'application/json'})
    );

    if(this.imageUpdated) {
      formData.append(
        'imageFile',
        training.image.file,
        training.image.file.name
      );
    }
    return formData;
  }

  onFileChanged({event}: { event: any }) {
    this.imageUpdated = true;
    if(event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.training.image = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
        };
      }
      reader.readAsDataURL(file);
    }
  }

}
