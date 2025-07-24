package com.zidio.jobportal.controller;

import com.zidio.jobportal.dto.LoginRequest;
import  com.zidio.jobportal.model.User;
import com.zidio.jobportal.repository.UserRepository;
import com.zidio.jobportal.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public UserController(UserRepository userRepo, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil)
    {
        this.userRepo=userRepo;
        this.jwtUtil=jwtUtil;
        this.passwordEncoder=passwordEncoder;
    }
    public UserController(UserRepository userRepo)
    {
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
    @PostMapping("/login")
    public ReponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest){
        Optional<User> optionalUser = userRepo.findByEmail(loginRequest.getEmial());

        if(optionalUser.isEmpty()){
            return ReponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user=optionalUser.get();
        boolean passwordMatch=passwordEncoder.matches(loginRequest.getPasseord(),user.getPassword());

        if(!passwordMatch){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return ReponseEntity.ok("   Bearer" + token);
    }

    @PostMapping("/{userId}/upload-resume")
    public ResponseEntity<String> uploadResume(@PathVariable Long userId,
                                               @RequestParam("file") MultipartFile file) {
        Optional<User> optionalUser = userRepo.findById(userId);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = optionalUser.get();

        try {
            String uploadDir = "uploads/";
            String filename = userId + "_resume_" + file.getOriginalFilename();
            String fullPath = uploadDir + filename;

            file.transferTo(new java.io.File(fullPath));

            user.setResumePath(fullPath);
            userRepo.save(user);

            return ResponseEntity.ok("Resume uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
        }
    }


}
