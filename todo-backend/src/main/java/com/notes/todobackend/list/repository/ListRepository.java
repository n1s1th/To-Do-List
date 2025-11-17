package com.notes.todobackend.list.repository;

import com.notes.todobackend.list.entity.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ListRepository extends JpaRepository<ListEntity, UUID> {
    List<ListEntity> findByUserId(UUID userId);
}
