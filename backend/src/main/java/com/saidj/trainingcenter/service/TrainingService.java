package com.saidj.trainingcenter.service;

import java.util.List;

import com.saidj.trainingcenter.model.Training;

public interface TrainingService {
	List<Training> getTrainings();
	Training getTraining(Long trainingId);
	Training saveTraining(Training training);
	Training updateTraining(Training training);
	void deleteTraining(Long trainingId);
	Training addParticipantToTraining(Long trainingId, Long userId);
	Training addCommentToTraining(Long trainingId, Long commentId);
}
