package com.example.auth.dto;

import java.util.UUID;

public class UserResponse {
    private UUID id;
    private String email;
    private String displayName;

    public UserResponse(UUID id, String email, String displayName) {
        this.id = id;
        this.email = email;
        this.displayName = displayName;
    }

    // Getters (no setters — immutable response)
    public UUID getId() { return id; }
    public String getEmail() { return email; }
    public String getDisplayName() { return displayName; }
}