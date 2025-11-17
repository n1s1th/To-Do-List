package com.notes.todobackend.auth.service;

import com.notes.todobackend.auth.dto.LoginPayload;
import com.notes.todobackend.auth.dto.RegisterPayload;
import com.notes.todobackend.user.entity.User;
import com.notes.todobackend.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterPayload p) {
        User u = new User();
        u.setEmail(p.email());
        u.setDisplayName(p.displayName());
        u.setPasswordHash(passwordEncoder.encode(p.password()));
        return userRepository.save(u);
    }

    public User login(LoginPayload p) {
        return userRepository.findByEmail(p.email())
                .filter(u -> passwordEncoder.matches(p.password(), u.getPasswordHash()))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}
