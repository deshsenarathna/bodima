package com.bodima.demo.repositary;

import com.bodima.demo.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    // e.g., List<Place> findByCityIgnoreCase(String city);
}