package com.notes.todobackend.task.repository;

import com.notes.todobackend.task.entity.Task;
import com.notes.todobackend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    
    // Find task by ID and user (security check)
    Optional<Task> findByIdAndUser(UUID id, User user);
    
    // Inbox: incomplete tasks
    List<Task> findByUserAndIsCompletedOrderByCreatedAtDesc(User user, boolean isCompleted);
    
    // My Day: tasks with my_day_date = today
    List<Task> findByUserAndMyDayDateOrderByCreatedAtDesc(User user, LocalDate myDayDate);
    
    // Important: important and not completed
    List<Task> findByUserAndIsImportantAndIsCompletedOrderByCreatedAtDesc(User user, boolean isImportant, boolean isCompleted);
    
    // Planned: tasks with due date not null and not completed
    @Query("SELECT t FROM Task t WHERE t.user = :user AND t.dueAt IS NOT NULL AND t.isCompleted = false ORDER BY t.dueAt ASC")
    List<Task> findPlannedTasks(@Param("user") User user);
    
    // Completed: completed tasks
    List<Task> findByUserAndIsCompletedOrderByUpdatedAtDesc(User user, boolean isCompleted);
    
    // Search in title or description
    @Query("SELECT t FROM Task t WHERE t.user = :user AND (LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%'))) ORDER BY t.createdAt DESC")
    List<Task> searchTasks(@Param("user") User user, @Param("search") String search);
}
