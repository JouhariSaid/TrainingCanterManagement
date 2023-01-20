package com.saidj.trainingcenter.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.saidj.trainingcenter.model.Training;
import com.saidj.trainingcenter.model.User;
import com.saidj.trainingcenter.service.UserService;

@RestController
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/users")
	public List<User> getUsers() {
		return userService.getUsers();
	}
	
	@GetMapping("/users/role/{role}")
	public List<User> getUsersByRole(@PathVariable String role) {
		return userService.getUsersByRoleAndIsDeleted(role);
	}
	
	@GetMapping("/users/trainings/{userId}")
	public Set<Training> getUserTrainings(@PathVariable Long userId) {
		return userService.getUserTrainings(userId);
	}
	
	@GetMapping("/users/{id}")
	public User getUser(@PathVariable Long id) {
		return userService.getUser(id);
	}
	
	@GetMapping("/users/auth/{email}")
	public User getUserByEmail(@PathVariable String email) {
		return userService.getUserByEmail(email);
	}
	
	@PostMapping("/adduser")
	public User saveUser(@RequestBody User user) {
		return userService.saveUser(user);
	}
	
	@PutMapping("/users/{id}")
	public User updateUser(@PathVariable Long id, @RequestBody User user) {
		user.setUserId(id);
		return userService.updateUser(user);
	}
	
}
