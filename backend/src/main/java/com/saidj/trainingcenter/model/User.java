package com.saidj.trainingcenter.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;
	
	private String name;
	
	@Email(message = "Please enter a valid email address")
	@Column(unique = true)
	private String email;
	
	private String phone;
	private String role;
	private String password;
	
	@ElementCollection
	@CollectionTable(name = "domains")
	private Set<String> domains;
	
	@ManyToMany(
		fetch = FetchType.LAZY, 
		cascade = {
	        CascadeType.PERSIST,
	        CascadeType.MERGE
	    },
		mappedBy = "participants"
	)
	@JsonIgnore
	private Set<Training> trainings;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private Set<Comment> comments;
	
	@JsonIgnore
	@OneToMany(mappedBy = "trainer", fetch = FetchType.LAZY)
	private Set<Training> trainerTrainings;
}
