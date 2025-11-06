package com.bodima.demo.repositary;

import com.bodima.demo.entity.Place;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    @EntityGraph(attributePaths = "images")
    List<Place> findAllByOrderByIdDesc();

    @EntityGraph(attributePaths = "images")
    List<Place> findByOwnerEmailIgnoreCase(String ownerEmail);
}