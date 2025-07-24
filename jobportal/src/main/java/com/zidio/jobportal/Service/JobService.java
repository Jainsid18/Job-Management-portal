package com.zidio.jobportal.service;

import com.zidio.jobportal.model.Job;
import com.zidio.jobportal.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class JobService {
    private final JobRepository jobRepo;

    public JobService(JobRepository jobRepo) {
        this.jobRepo = jobRepo;
    }

    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }

    public Job postJob(Job job) {
        job.setPostedDate(LocalDate.now());
        return jobRepo.save(job);
    }

    public Job getJobById(Long id) {
        return jobRepo.findById(id).orElse(null);
    }
}
