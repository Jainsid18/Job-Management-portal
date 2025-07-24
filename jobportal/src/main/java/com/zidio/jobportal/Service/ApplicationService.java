package com.zidio.jobportal.service;

import com.zidio.jobportal.model.Application;
import com.zidio.jobportal.model.Job;
import com.zidio.jobportal.model.User;
import com.zidio.jobportal.repository.ApplicationRepository;
import com.zidio.jobportal.repository.JobRepository;
import com.zidio.jobportal.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    private final ApplicationRepository appRepo;
    private final UserRepository userRepo;
    private final JobRepository jobRepo;

    public ApplicationService(ApplicationRepository appRepo, UserRepository userRepo, JobRepository jobRepo) {
        this.appRepo = appRepo;
        this.userRepo = userRepo;
        this.jobRepo = jobRepo;
    }

    public Application applyToJob(Long userId, Long jobId) {
        Optional<User> userOpt = userRepo.findById(userId);
        Optional<Job> jobOpt = jobRepo.findById(jobId);

        if (userOpt.isEmpty() || jobOpt.isEmpty()) return null;

        Application app = new Application();
        app.setUser(userOpt.get());
        app.setJob(jobOpt.get());
        app.setStatus("PENDING");
        app.setAppliedDate(LocalDate.now());

        return appRepo.save(app);
    }

    public List<Application> getApplicationsByUser(Long userId) {
        return appRepo.findByUserId(userId);
    }

    public List<Application> getApplicationsByJob(Long jobId) {
        return appRepo.findByJobId(jobId);
    }
}
