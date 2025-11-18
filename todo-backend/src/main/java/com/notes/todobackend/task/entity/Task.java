package com.notes.todobackend.task.entity;

import com.notes.todobackend.list.entity.ListEntity;
import com.notes.todobackend.user.entity.User;
import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "list_id")
    private ListEntity list;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    public boolean isCompleted = false;
    private boolean isImportant = false;
    private Instant dueAt;
    private LocalDate myDayDate;
    private short priority = 0;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    @PreUpdate
    public void onUpdate() { updatedAt = Instant.now(); }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void User(User user) {
    }

    public void setDescription(String description) {
    }

    public void setCreatedAt(Instant now) {
    }

    public void setPriority(Short priority) {
    }

    public UUID getId() {
    }

    public void setList(@org.jetbrains.annotations.NotNull ListEntity listEntity) {
    }

    public Task getUser() {
    }

    public Task getList() {
    }

    public String getDescription() {
    }

    public Instant getDueAt() {
    }

    public LocalDate getMyDayDate() {
    }

    public short getPriority() {
    }

    public Instant getCreatedAt() {
    }

    public Instant getUpdatedAt() {
    }

    // getters/setters
}
