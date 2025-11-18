package com.notes.todobackend.auth.controller;

import com.notes.todobackend.auth.dto.LoginPayload;
import com.notes.todobackend.auth.dto.RegisterPayload;
import com.notes.todobackend.auth.dto.UserResponse;
import com.notes.todobackend.auth.service.AuthService;
import com.notes.todobackend.user.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterPayload p) {
        User u = authService.register(p);
        return ResponseEntity.status(201).body(new UserResponse(u.getId().toString(), u.getEmail(), u.getDisplayName()));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginPayload p) {
        User u = authService.login(p);
        // TODO: Issue JWT cookie here. For now return user data (frontend will treat as logged)
        return ResponseEntity.ok(new UserResponse(u.getId().toString(), u.getEmail(), u.getDisplayName()));
    }
}