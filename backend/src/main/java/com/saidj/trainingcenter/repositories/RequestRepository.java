package com.saidj.trainingcenter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.saidj.trainingcenter.model.Request;
import com.saidj.trainingcenter.model.Training;

public interface RequestRepository extends JpaRepository<Request, Long> {
	List<Request> findByIsAccepted(boolean isAccepted);
	
	@Query("SELECT training FROM Request WHERE requestId=:requestId")
	Training getRequestTraining(Long requestId);
}
