package com.notes.todobackend.user.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable=false, unique=true)
    private String email;

    @Column(nullable=false)
    private String passwordHash;

    private String displayName;

    private Instant createdAt = Instant.now();

    // getters / setters
    // ... (generate in IDE)
}
