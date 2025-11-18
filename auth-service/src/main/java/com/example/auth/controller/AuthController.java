package com.example.auth.controller;

import com.example.auth.config.JwtUtil;
import com.example.auth.dto.*;
import com.example.auth.model.User;
import com.example.auth.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        UserResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(
            @RequestBody LoginRequest request,
            HttpServletResponse response) {

        User user = authService.authenticate(request.getEmail(), request.getPassword());

        String token = jwtUtil.generateToken(user.getId(), user.getEmail());

        // Set HttpOnly cookie
        Cookie cookie = new Cookie("access_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true in prod (HTTPS)
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60); // 24 hours
        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("access_token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(0); // expire immediately
        response.addCookie(cookie);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(@CookieValue(value = "access_token", required = false) String token) {
        if (token == null || token.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            UUID userId = jwtUtil.getUserIdFromToken(token);
            // Optional: re-fetch from DB to ensure user exists
            // For simplicity, we trust the token (you can enhance later)
            // In real app, add a UserService to fetch & map.
            // Here, simulate:
            // User user = userService.findById(userId);
            // return ResponseEntity.ok(new UserResponse(...));

            // ⚠️ For demo only: reconstruct minimal data from token
            // Better: store only userId in token, fetch full user from DB
            String email = jwtUtil.getClaim(token, claims -> claims.get("email", String.class));
            String displayName = "N/A"; // ← placeholder (real: fetch from DB)
            return ResponseEntity.ok(new UserResponse(userId, email, displayName));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}