package com.yourcompany.todo.task.controller;

import com.yourcompany.todo.task.dto.CreateTaskRequest;
import com.yourcompany.todo.task.dto.TaskDto;
import com.yourcompany.todo.task.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;
    public TaskController(TaskService taskService) { this.taskService = taskService; }

    @GetMapping
    public List<TaskDto> listTasks() {
        return taskService.listAll();
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody CreateTaskRequest req) {
        var dto = taskService.create(req);
        return ResponseEntity.status(201).body(dto);
    }

    // other endpoints (update/delete/toggle) to add similarly
}
