package com.yourcompany.todo.list.controller;

import com.yourcompany.todo.list.dto.ListDto;
import com.yourcompany.todo.list.entity.ListEntity;
import com.yourcompany.todo.list.repository.ListRepository;
import com.yourcompany.todo.user.entity.User;
import com.yourcompany.todo.user.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lists")
public class ListController {

    private final ListRepository listRepository;
    private final UserRepository userRepository;

    public ListController(ListRepository listRepository, UserRepository userRepository) {
        this.listRepository = listRepository;
        this.userRepository = userRepository;
    }

    // NOTE: For now we assume a single demo user until auth is integrated.
    private User getDemoUser() {
        return userRepository.findAll().stream().findFirst().orElse(null);
    }

    @GetMapping
    public List<ListDto> getLists() {
        var user = getDemoUser();
        return listRepository.findByUserId(user.getId()).stream()
                .map(l -> new ListDto(l.getId(), l.getUser().getId(), l.getName(), l.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<ListDto> createList(@RequestBody CreateListRequest req) {
        var user = getDemoUser();
        ListEntity l = new ListEntity();
        l.setUser(user);
        l.setName(req.name);
        var saved = listRepository.save(l);
        return ResponseEntity.status(201).body(new ListDto(saved.getId(), user.getId(), saved.getName(), saved.getCreatedAt()));
    }

    public static class CreateListRequest {
        public String name;
    }
}
