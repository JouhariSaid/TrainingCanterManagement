package com.saidj.trainingcenter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saidj.trainingcenter.model.Comment;
import com.saidj.trainingcenter.model.Training;
import com.saidj.trainingcenter.model.User;
import com.saidj.trainingcenter.repositories.TrainingRepository;

@Service
public class TrainingServiceImp implements TrainingService {
	
	@Autowired
	private TrainingRepository trainingRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CommentService commentService;

	@Override
	public List<Training> getTrainings() {
		return trainingRepository.findAll();
	}

	@Override
	public Training getTraining(Long trainingId) {
		Optional<Training> training = trainingRepository.findById(trainingId);
		if(training.isPresent()) {
			User trainer = trainingRepository.getTrainingTrainer(trainingId);
			training.get().setTrainer(trainer);
			return training.get();
		}
		throw new RuntimeException("Training not found");
	}

	@Override
	public Training saveTraining(Training training) {
		return trainingRepository.save(training);
	}

	@Override
	public Training updateTraining(Training training) {
		return trainingRepository.save(training);
	}

	@Override
	public void deleteTraining(Long trainingId) {
		trainingRepository.deleteById(trainingId);
	}

	@Override
	public Training addParticipantToTraining(Long trainingId, Long userId) {
		Training training = getTraining(trainingId);
		User user = userService.getUser(userId);
		
		training.getParticipants().add(user);
		
		return updateTraining(training);
	}

	@Override
	public Training addCommentToTraining(Long trainingId, Long commentId) {
		Training training = getTraining(trainingId);
		Comment comment = commentService.getComment(commentId);
		
		training.getComments().add(comment);
		
		return updateTraining(training);
	}

}
