package com.saidj.trainingcenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.saidj.trainingcenter.model.Comment;
import com.saidj.trainingcenter.model.Training;
import com.saidj.trainingcenter.service.CommentService;
import com.saidj.trainingcenter.service.TrainingService;

@RestController
@CrossOrigin("*")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private TrainingService trainingService;
	
	@GetMapping("/comments")
	public List<Comment> getValidatedComments() {
		return commentService.getValidatedComments();
	}
	
	@GetMapping("/comments/{commentId}")
	public Comment getComment(@PathVariable Long commentId) {
		return commentService.getComment(commentId);
	}
	
	@PostMapping("/addcomment")
	public Comment saveComment(@RequestBody Comment comment) {
		return commentService.saveComment(comment);
	}
	
	@PutMapping("/comments/{commentId}")
	public Comment updateComment(@PathVariable Long commentId, @RequestBody Comment comment) {
		comment.setCommentId(commentId);
		return commentService.updateComment(comment);
	}
	
	@DeleteMapping("/comments/{commentId}")
	public void deleteComment(@PathVariable Long commentId) {
		Training training = getCommentTraining(commentId);
		training.getComments().remove(getComment(commentId));
		trainingService.updateTraining(training);
		commentService.deleteComment(commentId);
	}
	
	@GetMapping("/comments/training/{commentId}")
	public Training getCommentTraining(@PathVariable Long commentId) {
		return commentService.getCommentTraining(commentId);
	}
	
}
