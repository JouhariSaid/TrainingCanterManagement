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

import com.saidj.trainingcenter.model.Request;
import com.saidj.trainingcenter.service.RequestService;

@RestController
@CrossOrigin("*")
public class RequestController {
	@Autowired
	private RequestService requestService;
	
	@GetMapping("/requests")
	public List<Request> getRequests() {
		return requestService.getRequests();
	}

	@GetMapping("/requests/{requestId}")
	public Request getRequest(@PathVariable Long requestId) {
		return requestService.getRequest(requestId);
	}

	@PostMapping("/addrequest")
	public Request saveRequest(@RequestBody Request request) {
		return requestService.saveRequest(request);
	}

	@PutMapping("/requests/{requestId}")
	public Request updateRequest(@PathVariable Long requestId, @RequestBody Request request) {
		request.setRequestId(requestId);
		request.setAccepted(true);
		return requestService.updateRequest(request);
	}

	@DeleteMapping("/requests/{requestId}")
	public void deleteRequest(@PathVariable Long requestId) {
		requestService.deleteRequest(requestId);
	}
}
