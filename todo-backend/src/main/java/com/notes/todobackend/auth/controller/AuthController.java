package com.yourcompany.todo.auth.controller;

import com.yourcompany.todo.auth.dto.LoginPayload;
import com.yourcompany.todo.auth.dto.RegisterPayload;
import com.yourcompany.todo.auth.dto.UserResponse;
import com.yourcompany.todo.auth.service.AuthService;
import com.yourcompany.todo.user.entity.User;
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
