package com.notes.todobackend.task.dto;

public record UpdateTaskRequest(String title, String description, Boolean isCompleted, Boolean isImportant, String dueAt, Short priority, String listId) {}
