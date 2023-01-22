package com.saidj.trainingcenter.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.saidj.trainingcenter.model.Request;
import com.saidj.trainingcenter.model.Training;
import com.saidj.trainingcenter.repositories.RequestRepository;

@Service
public class RequestServiceImp implements RequestService {
	
	@Autowired
	private RequestRepository requestRepository;

	@Override
	public List<Request> getRequests() {
		List<Request> requests = requestRepository.findByIsAccepted(false);
		for(Request request : requests) {
			Training training = requestRepository.getRequestTraining(request.getRequestId());
			request.setTraining(training);
			System.out.println(request.getTraining().getName());
		}
		return requests;
	}

	@Override
	public Request getRequest(Long requestId) {
		Optional<Request> request = requestRepository.findById(requestId);
		if(request.isPresent()) return request.get();
		throw new RuntimeException("Request not found");
	}

	@Override
	public Request saveRequest(Request request) {
		return requestRepository.save(request);
	}

	@Override
	public Request updateRequest(Request request) {
		return requestRepository.save(request);
	}

	@Override
	public void deleteRequest(Long requestId) {
		requestRepository.deleteById(requestId);
	}

}
