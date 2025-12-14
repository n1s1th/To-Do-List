package com.notes.todobackend.task.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateTaskRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    private String dueAt; // ISO-8601 string
    
    // Constructors
    public CreateTaskRequest() {}
    
    public CreateTaskRequest(String title, String description, String dueAt) {
        this.title = title;
        this.description = description;
        this.dueAt = dueAt;
    }
    
    // Getters and Setters
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getDueAt() {
        return dueAt;
    }
    
    public void setDueAt(String dueAt) {
        this.dueAt = dueAt;
    }
}
