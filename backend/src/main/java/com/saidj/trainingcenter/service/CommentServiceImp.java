package com.saidj.trainingcenter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saidj.trainingcenter.model.Comment;
import com.saidj.trainingcenter.model.Training;
import com.saidj.trainingcenter.repositories.CommentRepository;

@Service
public class CommentServiceImp implements CommentService {
	
	@Autowired
	private CommentRepository commentRepository;

	@Override
	public List<Comment> getValidatedComments() {
		return commentRepository.getValidatedComments();
	}

	@Override
	public Comment getComment(Long commentId) {
		Optional<Comment> comment = commentRepository.findById(commentId);
		if(comment.isPresent()) return comment.get();
		throw new RuntimeException("No comments with id: " + commentId);
	}

	@Override
	public Comment saveComment(Comment comment) {
		return commentRepository.save(comment);
	}

	@Override
	public Comment updateComment(Comment comment) {
		return commentRepository.save(comment);
	}

	@Override
	public void deleteComment(Long commentId) {
		commentRepository.deleteById(commentId);
	}

	@Override
	public Training getCommentTraining(Long commentId) {
		return commentRepository.getCommentTraining(commentId);
	}
	
}
