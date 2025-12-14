package com.notes.todobackend.task.service;

import com.notes.todobackend.task.dto.CreateTaskRequest;
import com.notes.todobackend.task.dto.TaskDto;
import com.notes.todobackend.task.dto.UpdateTaskRequest;
import com.notes.todobackend.task.entity.Task;
import com.notes.todobackend.task.repository.TaskRepository;
import com.notes.todobackend.user.entity.User;
import com.notes.todobackend.user.service.DemoUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskService {
    
    private final TaskRepository taskRepository;
    private final DemoUserService demoUserService;
    
    public TaskService(TaskRepository taskRepository, DemoUserService demoUserService) {
        this.taskRepository = taskRepository;
        this.demoUserService = demoUserService;
    }
    
    public List<TaskDto> getTasks(String view, String search) {
        User user = demoUserService.getDemoUser();
        List<Task> tasks;
        
        // Validate and normalize view parameter
        if (view == null) {
            view = "inbox";
        }
        view = view.toLowerCase().trim();
        
        if (search != null && !search.isBlank()) {
            tasks = taskRepository.searchTasks(user, search);
        } else {
            tasks = switch (view) {
                case "myday" -> taskRepository.findByUserAndMyDayDateOrderByCreatedAtDesc(user, LocalDate.now());
                case "important" -> taskRepository.findByUserAndIsImportantAndIsCompletedOrderByCreatedAtDesc(user, true, false);
                case "planned" -> taskRepository.findPlannedTasks(user);
                case "completed" -> taskRepository.findByUserAndIsCompletedOrderByUpdatedAtDesc(user, true);
                default -> taskRepository.findByUserAndIsCompletedOrderByCreatedAtDesc(user, false); // inbox
            };
        }
        
        return tasks.stream()
                .map(TaskDto::new)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public TaskDto createTask(CreateTaskRequest request) {
        User user = demoUserService.getDemoUser();
        
        Task task = new Task(user, request.getTitle());
        task.setDescription(request.getDescription());
        
        if (request.getDueAt() != null && !request.getDueAt().isBlank()) {
            try {
                task.setDueAt(Instant.parse(request.getDueAt()));
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid dueAt format. Expected ISO-8601 format.");
            }
        }
        
        task = taskRepository.save(task);
        return new TaskDto(task);
    }
    
    @Transactional
    public TaskDto updateTask(UUID taskId, UpdateTaskRequest request) {
        User user = demoUserService.getDemoUser();
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        
        if (request.getTitle() != null) {
            task.setTitle(request.getTitle());
        }
        
        if (request.getDescription() != null) {
            task.setDescription(request.getDescription());
        }
        
        if (request.getDueAt() != null) {
            if (request.getDueAt().isBlank()) {
                task.setDueAt(null);
            } else {
                try {
                    task.setDueAt(Instant.parse(request.getDueAt()));
                } catch (Exception e) {
                    throw new IllegalArgumentException("Invalid dueAt format. Expected ISO-8601 format.");
                }
            }
        }
        
        if (request.getIsCompleted() != null) {
            task.setCompleted(request.getIsCompleted());
        }
        
        if (request.getIsImportant() != null) {
            task.setImportant(request.getIsImportant());
        }
        
        if (request.getMyDayDate() != null) {
            if (request.getMyDayDate().isBlank()) {
                task.setMyDayDate(null);
            } else {
                try {
                    task.setMyDayDate(LocalDate.parse(request.getMyDayDate()));
                } catch (Exception e) {
                    throw new IllegalArgumentException("Invalid myDayDate format. Expected ISO date format (yyyy-MM-dd).");
                }
            }
        }
        
        task = taskRepository.save(task);
        return new TaskDto(task);
    }
    
    @Transactional
    public void deleteTask(UUID taskId) {
        User user = demoUserService.getDemoUser();
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        taskRepository.delete(task);
    }
    
    @Transactional
    public TaskDto toggleImportant(UUID taskId) {
        User user = demoUserService.getDemoUser();
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setImportant(!task.isImportant());
        task = taskRepository.save(task);
        return new TaskDto(task);
    }
    
    @Transactional
    public TaskDto toggleComplete(UUID taskId) {
        User user = demoUserService.getDemoUser();
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setCompleted(!task.isCompleted());
        task = taskRepository.save(task);
        return new TaskDto(task);
    }
    
    @Transactional
    public TaskDto addToMyDay(UUID taskId) {
        User user = demoUserService.getDemoUser();
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setMyDayDate(LocalDate.now());
        task = taskRepository.save(task);
        return new TaskDto(task);
    }
    
    @Transactional
    public TaskDto removeFromMyDay(UUID taskId) {
        User user = demoUserService.getDemoUser();
        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setMyDayDate(null);
        task = taskRepository.save(task);
        return new TaskDto(task);
    }
}
