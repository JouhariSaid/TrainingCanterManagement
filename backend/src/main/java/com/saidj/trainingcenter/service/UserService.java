package com.saidj.trainingcenter.service;

import java.util.List;
import java.util.Set;

import com.saidj.trainingcenter.model.Training;
import com.saidj.trainingcenter.model.User;

public interface UserService {
	List<User> getUsers();
	List<User> getUsersByRoleAndIsDeleted(String role);
	
	Set<Training> getUserTrainings(Long userId);
	
	User getUser(Long userId);
	User getUserByEmail(String email);
	
	User saveUser(User user);
	User updateUser(User user);
}
