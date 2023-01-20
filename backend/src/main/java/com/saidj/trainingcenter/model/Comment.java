package com.saidj.trainingcenter.model;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "comment")
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long commentId;
	
	private String comment;
	private boolean isValidated = false;
	
	@CreationTimestamp
	private Date date;
	
	@ManyToOne
	@JoinColumn(name = "training_id")
	@JsonBackReference
	private Training training;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}
