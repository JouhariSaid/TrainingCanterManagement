package com.saidj.trainingcenter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.saidj.trainingcenter.model.Comment;
import com.saidj.trainingcenter.model.Training;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	@Query("FROM Comment WHERE isValidated=false")
	List<Comment> getValidatedComments();
	
	@Query("SELECT training FROM Comment WHERE commentId=:commentId")
	Training getCommentTraining(Long commentId);
}
