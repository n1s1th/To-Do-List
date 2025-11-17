package com.notes.todobackend.task.repository;

import com.notes.todobackend.task.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByUserId(UUID userId);
    List<Task> findByUserIdAndListId(UUID userId, UUID listId);
    List<Task> findByUserIdAndMyDayDate(UUID userId, LocalDate date);
    List<Task> findByUserIdAndIsImportantTrue(UUID userId);
}
