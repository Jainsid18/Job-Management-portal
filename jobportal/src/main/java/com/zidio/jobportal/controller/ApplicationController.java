package com.zidio.jobportal.controller;

import com.zidio.jobportal.model.Application;
import com.zidio.jobportal.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    private final ApplicationService appService;

    public ApplicationController(ApplicationService appService) {
        this.appService = appService;
    }

    @PostMapping("/apply")
    public Application apply(@RequestParam Long userId, @RequestParam Long jobId) {
        return appService.applyToJob(userId, jobId);
    }

    @GetMapping("/user/{userId}")
    public List<Application> getByUser(@PathVariable Long userId) {
        return appService.getApplicationsByUser(userId);
    }


    @GetMapping("/job/{jobId}")
    public List<Application> getByJob(@PathVariable Long jobId) {
        return appService.getApplicationsByJob(jobId);
    }
}
