package com.notes.todobackend.task.dto;

public record CreateTaskRequest(String title, String description, String dueAt, Short priority, String listId) {}
