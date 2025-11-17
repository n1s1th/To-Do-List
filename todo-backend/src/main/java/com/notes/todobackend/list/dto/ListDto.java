package com.notes.todobackend.list.dto;

import java.time.Instant;
import java.util.UUID;

public record ListDto(UUID id, UUID userId, String name, Instant createdAt) {}
