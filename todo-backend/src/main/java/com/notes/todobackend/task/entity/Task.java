package com.yourcompany.todo.task.entity;

import com.yourcompany.todo.list.entity.ListEntity;
import com.yourcompany.todo.user.entity.User;
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

    private boolean isCompleted = false;
    private boolean isImportant = false;
    private Instant dueAt;
    private LocalDate myDayDate;
    private short priority = 0;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    @PreUpdate
    public void onUpdate() { updatedAt = Instant.now(); }

    // getters/setters
}
