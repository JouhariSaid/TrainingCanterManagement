package com.saidj.trainingcenter.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saidj.trainingcenter.model.Training;
import com.saidj.trainingcenter.model.User;
import com.saidj.trainingcenter.repositories.UserRepository;

@Service
public class UserServiceImp implements UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public List<User> getUsers() {
		return userRepository.findByIsDeleted(false);
	}
	
	@Override
	public List<User> getUsersByRoleAndIsDeleted(String role) {
		return userRepository.findByRoleAndIsDeleted(role, false);
	}

	@Override
	public Set<Training> getUserTrainings(Long userId) {
		return userRepository.getUserTrainings(userId);
	}

	@Override
	public User getUser(Long id) {
		Optional<User> user = userRepository.findById(id);
		if(user.isPresent()) return user.get();
		throw new RuntimeException("User not found");
	}
	
	@Override
	public User getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User updateUser(User user) {
		return userRepository.save(user);
	}

}
