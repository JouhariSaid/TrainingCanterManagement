package com.saidj.trainingcenter.controller;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.saidj.trainingcenter.excel.TrainingParticipantsExporter;
import com.saidj.trainingcenter.model.ImageModel;
import com.saidj.trainingcenter.model.Training;
import com.saidj.trainingcenter.model.User;
import com.saidj.trainingcenter.repositories.ImageRepository;
import com.saidj.trainingcenter.service.TrainingService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin("*")
public class TrainingController {
	
	@Autowired
	private TrainingService trainingService;
	
	@Autowired
	private ImageRepository imageRepository;
	
	@GetMapping("/trainings") 
	public List<Training> getTrainings() {
		return trainingService.getTrainings();
	}
	
	@GetMapping("/trainings/{id}")
	public Training getTraining(@PathVariable Long id) {
		return trainingService.getTraining(id);
	}

	@PostMapping(value= {"/addtraining"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public Training saveTraining(
			@RequestPart("training") Training training,
			@RequestPart("imageFile") MultipartFile file) {
		try {
			ImageModel image = uploadImage(file);
			training.setImage(image);
			return trainingService.saveTraining(training);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@PutMapping(value= {"/trainings/{trainingId}"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public Training updateeTraining(
			@PathVariable Long trainingId,
			@RequestPart("training") Training training,
			@RequestPart(name = "imageFile", required = false) MultipartFile file) {
		try {
			training.setTrainingId(trainingId);
			if(file == null) {
				training.setImage(getTraining(trainingId).getImage());
				return trainingService.updateTraining(training);
			}
			ImageModel imageModel = getTraining(trainingId).getImage();
			Long imageId = imageModel.getImageId();
			ImageModel image = uploadImage(file);
			training.setImage(image);
			Training t = trainingService.updateTraining(training);
			imageRepository.deleteById(imageId);
			return t;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	@DeleteMapping("/trainings/{trainingId}")
	public void deleteTraining(@PathVariable Long trainingId) {
		trainingService.deleteTraining(trainingId);
	}
	
	@PutMapping("/trainings/newparticipant/{trainingId}/{userId}")
	Training addParticipantToTraining(@PathVariable Long trainingId, @PathVariable Long userId) {
		return trainingService.addParticipantToTraining(trainingId, userId);
	}
	
	@GetMapping("/participants/{trainingId}")
	public void exportListOfParticipantsToExcel(HttpServletResponse response, @PathVariable Long trainingId) throws IOException {
		response.setContentType("application/octet-stream");
		String headerKey = "Content-Disposition";
		String headerValue = "attachement; filename=list_participants.xlsx";
		response.setHeader(headerKey, headerValue);
		
		Training training = trainingService.getTraining(trainingId);
		Set<User> participants = training.getParticipants();
		
		TrainingParticipantsExporter exporter = new TrainingParticipantsExporter(participants);
		exporter.export(response);
	}
	
	@PutMapping("/trainings/newcomment/{trainingId}/{commentId}")
	Training addCommentToTraining(@PathVariable Long trainingId, @PathVariable Long commentId) {
		return trainingService.addCommentToTraining(trainingId, commentId);
	}
	
	@PutMapping("/trainings/newrequest/{trainingId}/{requestId}")
	Training addRequestToTraining(@PathVariable Long trainingId, @PathVariable Long requestId) {
		return trainingService.addRequestToTraining(trainingId, requestId);
	}
	
	public ImageModel uploadImage(MultipartFile multipartFile) throws IOException {
		ImageModel imageModel = new ImageModel(
				multipartFile.getOriginalFilename(),
				multipartFile.getContentType(),
				multipartFile.getBytes()
		);
		return imageModel;
	}
}
