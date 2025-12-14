package com.notes.todobackend.task.dto;

public class UpdateTaskRequest {
    
    private String title;
    private String description;
    private String dueAt; // ISO-8601 string or null to clear
    private Boolean isCompleted;
    private Boolean isImportant;
    private String myDayDate; // ISO date string or null to clear
    
    // Constructors
    public UpdateTaskRequest() {}
    
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
    
    public Boolean getIsCompleted() {
        return isCompleted;
    }
    
    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
    
    public Boolean getIsImportant() {
        return isImportant;
    }
    
    public void setIsImportant(Boolean isImportant) {
        this.isImportant = isImportant;
    }
    
    public String getMyDayDate() {
        return myDayDate;
    }
    
    public void setMyDayDate(String myDayDate) {
        this.myDayDate = myDayDate;
    }
}
