package com.saidj.trainingcenter.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Training {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long trainingId;
	
	private String name;
	private String description;
	private double price;
	private double trainerAmount;
	private Date startDate;
	private Date endDate;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "training_images",
			joinColumns = {
					@JoinColumn(name = "training_id")
			},
			inverseJoinColumns = {
					@JoinColumn(name = "image_id")
			})
	private Set<ImageModel> image = new HashSet<>();
	
	@ManyToMany(
		fetch = FetchType.LAZY, 
		cascade = {
	        CascadeType.PERSIST,
	        CascadeType.MERGE
	    }
	)
	@JoinTable(
			name = "training_participants", 
			joinColumns = @JoinColumn(name = "training_id"), 
			inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private Set<User> participants;
	
	@OneToMany
	@JoinTable(
			name = "training_comments", 
			joinColumns = @JoinColumn(name = "training_id"), 
			inverseJoinColumns = @JoinColumn(name = "comment_id")
	)
	@JsonManagedReference
	private Set<Comment> comments;
	
	@ManyToOne
	@JoinColumn(name = "trainer_id")
	private User trainer;
	
}
