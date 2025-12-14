package com.notes.todobackend.task.dto;

import com.notes.todobackend.task.entity.Task;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public class TaskDto {
    
    private UUID id;
    private UUID userId;
    private String title;
    private String description;
    private boolean isCompleted;
    private boolean isImportant;
    private Instant dueAt;
    private LocalDate myDayDate;
    private Instant createdAt;
    private Instant updatedAt;
    
    // Constructor from entity
    public TaskDto(Task task) {
        this.id = task.getId();
        this.userId = task.getUser().getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.isCompleted = task.isCompleted();
        this.isImportant = task.isImportant();
        this.dueAt = task.getDueAt();
        this.myDayDate = task.getMyDayDate();
        this.createdAt = task.getCreatedAt();
        this.updatedAt = task.getUpdatedAt();
    }
    
    // Getters and Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public UUID getUserId() {
        return userId;
    }
    
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    
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
    
    public boolean isCompleted() {
        return isCompleted;
    }
    
    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }
    
    public boolean isImportant() {
        return isImportant;
    }
    
    public void setImportant(boolean important) {
        isImportant = important;
    }
    
    public Instant getDueAt() {
        return dueAt;
    }
    
    public void setDueAt(Instant dueAt) {
        this.dueAt = dueAt;
    }
    
    public LocalDate getMyDayDate() {
        return myDayDate;
    }
    
    public void setMyDayDate(LocalDate myDayDate) {
        this.myDayDate = myDayDate;
    }
    
    public Instant getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
    
    public Instant getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
