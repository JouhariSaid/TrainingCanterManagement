package com.saidj.trainingcenter.service;

import java.util.List;

import com.saidj.trainingcenter.model.Comment;
import com.saidj.trainingcenter.model.Training;

public interface CommentService {
	List<Comment> getValidatedComments();
	Comment getComment(Long commentId);
	Comment saveComment(Comment comment);
	Comment updateComment(Comment comment);
	void deleteComment(Long commentId);
	
	Training getCommentTraining(Long commentId);
}
