package com.saidj.trainingcenter.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "image_table")
public class ImageModel {

	public ImageModel(String name, String type, byte[] picByte) {
		this.name = name;
		this.type = type;
		this.picByte = picByte;
	}

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long imageId;

	@Column(name = "name")
	private String name;

	@Column(name = "type")
	private String type;


	//image bytes can have large lengths so we specify a value
	//which is more than the default length for picByte column
	@Column(name = "picByte", length = 185399)
	private byte[] picByte;


	//@OneToOne(cascade = CascadeType.ALL)
	//private Training training;
}