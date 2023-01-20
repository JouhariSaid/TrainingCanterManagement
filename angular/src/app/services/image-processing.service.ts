import {Injectable} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {Training} from "../components/model/training.model";
import {FileHandle} from "../components/model/file-handler.model";

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(
    private sanitizer: DomSanitizer
  ) {

  }

  // public createImages(training: Training){
  //   const trainingImages: any[] = training.image;
  //
  //   const trainingImagesToFileHadle: FileHandle[] =[];
  //
  //   for(let i=0; i < trainingImages.length; i++){
  //     const imageFileData = trainingImages[i];
  //
  //     const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
  //
  //     const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});
  //
  //     const finalFileHandle: FileHandle = {
  //       file: imageFile,
  //       url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
  //     };
  //     trainingImagesToFileHadle.push(finalFileHandle);
  //   }
  //
  //   training.image = trainingImagesToFileHadle;
  //   return training;
  // }

  createImage(training: Training) {
    const trainingImage: any = training.image;
    const imageBlob = this.dataURItoBlob(trainingImage.picByte, trainingImage.type);

    const imageFile = new File([imageBlob], trainingImage.name, {type: trainingImage.type});

    training.image = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };
    return training;
  }

  dataURItoBlob(picBytes: any, imageType: any ){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length ; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {type: imageType});
    return blob;

  }
}
