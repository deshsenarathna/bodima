package com.bodima.demo.controller;

import com.bodima.demo.entity.Place;
import com.bodima.demo.service.PlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RestController
@RequestMapping("/api/places")
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Place> create(
            @RequestParam String title,
            @RequestParam String city,
            @RequestParam Integer capacity,
            @RequestParam Integer pricePerMonth,
            @RequestParam String description,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) String ownerEmail,
            @RequestParam(required = false) String ownerPhone,
            @RequestParam(name = "images", required = false) MultipartFile[] images
    ) throws Exception {
        return ResponseEntity.ok(placeService.createPlaceWithImages(
                title, city, capacity, pricePerMonth, description, address, ownerEmail, ownerPhone, images
        ));
    }

    // Allow optional ?ownerEmail=... to return only that user's posts
    @GetMapping
    public ResponseEntity<List<Place>> all(@RequestParam(required = false) String ownerEmail) {
        return ResponseEntity.ok(placeService.listByOwnerEmail(ownerEmail));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> one(@PathVariable Long id) {
        return ResponseEntity.ok(placeService.get(id));
    }
}