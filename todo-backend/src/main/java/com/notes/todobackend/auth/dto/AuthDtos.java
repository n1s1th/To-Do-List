package com.yourcompany.todo.auth.dto;

public record RegisterPayload(String email, String password, String displayName) {}
public record LoginPayload(String email, String password) {}
public record UserResponse(String id, String email, String displayName) {}
