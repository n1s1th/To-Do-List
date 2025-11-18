package com.notes.todobackend.task.service;

import com.notes.todobackend.list.repository.ListRepository;
import com.notes.todobackend.task.dto.CreateTaskRequest;
import com.notes.todobackend.task.dto.TaskDto;
import com.notes.todobackend.task.entity.Task;
import com.notes.todobackend.task.repository.TaskRepository;
import com.notes.todobackend.user.entity.User;
import com.notes.todobackend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ListRepository listRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository, ListRepository listRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.listRepository = listRepository;
    }

    private User getDemoUser() {
        return userRepository.findAll().stream().findFirst().orElse(null);
    }

    public List<TaskDto> listAll() {
        var user = getDemoUser();
        return taskRepository.findByUserId(user.getId()).stream().map(this::toDto).collect(Collectors.toList());
    }

    public TaskDto create(CreateTaskRequest req) {
        var user = getDemoUser();
        Task t = new Task();
        t.User(user);
        t.setTitle(req.title());
        t.setDescription(req.description());
        t.setCreatedAt(Instant.now());
        if (req.priority() != null) t.setPriority(req.priority());
        // set list if provided
        if (req.listId() != null) {
            listRepository.findById(UUID.fromString(req.listId())).ifPresent(t::setList);
        }
        var saved = taskRepository.save(t);
        return toDto(saved);
    }

    private TaskDto toDto(Task t) {
        return new TaskDto(
                t.getId(), t.getUser().getId(),
                t.getList() != null ? t.getList().getId() : null,
                t.getTitle(), t.getDescription(),
                t.isCompleted(), t.isImportant(),
                t.getDueAt(), t.getMyDayDate(),
                t.getPriority(), t.getCreatedAt(), t.getUpdatedAt()
        );
    }
}
