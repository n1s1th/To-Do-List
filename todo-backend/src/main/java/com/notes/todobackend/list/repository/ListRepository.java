package com.yourcompany.todo.list.repository;

import com.yourcompany.todo.list.entity.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ListRepository extends JpaRepository<ListEntity, UUID> {
    List<ListEntity> findByUserId(UUID userId);
}
