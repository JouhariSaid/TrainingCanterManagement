package com.saidj.trainingcenter.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saidj.trainingcenter.model.ImageModel;

public interface ImageRepository extends JpaRepository<ImageModel, Long> {
	Optional<ImageModel> findByName(String name);
}