package com.notes.todobackend.task.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record TaskDto(UUID id, UUID userId, UUID listId, String title, String description,
                      boolean isCompleted, boolean isImportant, Instant dueAt, LocalDate myDayDate,
                      short priority, Instant createdAt, Instant updatedAt) {}

