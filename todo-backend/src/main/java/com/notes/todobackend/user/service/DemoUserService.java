package com.notes.todobackend.user.service;

import com.notes.todobackend.user.entity.User;
import com.notes.todobackend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class DemoUserService {
    
    private static final String DEMO_USER_EMAIL = "demo@example.com";
    
    private final UserRepository userRepository;
    
    public DemoUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User getDemoUser() {
        return userRepository.findByEmail(DEMO_USER_EMAIL)
                .orElseThrow(() -> new RuntimeException(
                        "Demo user not found. Please ensure Flyway migrations have been executed. " +
                        "Expected user with email: " + DEMO_USER_EMAIL
                ));
    }
}
