package com.notes.todobackend.task.controller;

import com.notes.todobackend.task.dto.CreateTaskRequest;
import com.notes.todobackend.task.dto.TaskDto;
import com.notes.todobackend.task.dto.UpdateTaskRequest;
import com.notes.todobackend.task.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    private final TaskService taskService;
    
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    
    @GetMapping
    public ResponseEntity<List<TaskDto>> getTasks(
            @RequestParam(defaultValue = "inbox") String view,
            @RequestParam(required = false) String search
    ) {
        List<TaskDto> tasks = taskService.getTasks(view, search);
        return ResponseEntity.ok(tasks);
    }
    
    @PostMapping
    public ResponseEntity<TaskDto> createTask(@Valid @RequestBody CreateTaskRequest request) {
        TaskDto task = taskService.createTask(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(
            @PathVariable UUID id,
            @RequestBody UpdateTaskRequest request
    ) {
        TaskDto task = taskService.updateTask(id, request);
        return ResponseEntity.ok(task);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/toggleImportant")
    public ResponseEntity<TaskDto> toggleImportant(@PathVariable UUID id) {
        TaskDto task = taskService.toggleImportant(id);
        return ResponseEntity.ok(task);
    }
    
    @PostMapping("/{id}/toggleComplete")
    public ResponseEntity<TaskDto> toggleComplete(@PathVariable UUID id) {
        TaskDto task = taskService.toggleComplete(id);
        return ResponseEntity.ok(task);
    }
    
    @PostMapping("/{id}/addToMyDay")
    public ResponseEntity<TaskDto> addToMyDay(@PathVariable UUID id) {
        TaskDto task = taskService.addToMyDay(id);
        return ResponseEntity.ok(task);
    }
    
    @PostMapping("/{id}/removeFromMyDay")
    public ResponseEntity<TaskDto> removeFromMyDay(@PathVariable UUID id) {
        TaskDto task = taskService.removeFromMyDay(id);
        return ResponseEntity.ok(task);
    }
}
