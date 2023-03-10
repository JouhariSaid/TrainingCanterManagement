package com.saidj.trainingcenter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.saidj.trainingcenter.model.Training;
import com.saidj.trainingcenter.model.User;

public interface TrainingRepository extends JpaRepository<Training, Long> {
	@Query("SELECT requests FROM Training WHERE trainingId=:trainingId")
	User getTrainingRequests(Long trainingId);
}
