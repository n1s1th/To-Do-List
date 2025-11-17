package com.yourcompany.todo.task.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record TaskDto(UUID id, UUID userId, UUID listId, String title, String description,
                      boolean isCompleted, boolean isImportant, Instant dueAt, LocalDate myDayDate,
                      short priority, Instant createdAt, Instant updatedAt) {}

public record CreateTaskRequest(String title, String description, String dueAt, Short priority, String listId) {}
public record UpdateTaskRequest(String title, String description, Boolean isCompleted, Boolean isImportant, String dueAt, Short priority, String listId) {}
