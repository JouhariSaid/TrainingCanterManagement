package com.saidj.trainingcenter.service;

import java.util.List;

import com.saidj.trainingcenter.model.Request;

public interface RequestService {
	List<Request> getRequests();
	Request getRequest(Long requestId);
	Request saveRequest(Request request);
	Request updateRequest(Request request);
	void deleteRequest(Long requestId);
}
