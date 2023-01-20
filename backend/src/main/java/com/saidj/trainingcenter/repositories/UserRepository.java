package com.saidj.trainingcenter.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.saidj.trainingcenter.model.Training;
import com.saidj.trainingcenter.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	List<User> findByRole(String role);
	User findByEmail(String email);
	
	@Query("SELECT trainings FROM User WHERE userId = :userId")
	Set<Training> getUserTrainings(Long userId);
}
