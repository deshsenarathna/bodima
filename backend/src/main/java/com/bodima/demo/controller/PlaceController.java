package com.bodima.demo.controller;

import com.bodima.demo.entity.Place;
import com.bodima.demo.service.PlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
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
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(name = "images", required = false) MultipartFile[] images
    ) throws Exception {
        return ResponseEntity.ok(placeService.createPlaceWithImages(
                title, city, capacity, pricePerMonth, description, address, ownerEmail, ownerPhone, latitude, longitude, images
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

    @PutMapping("/{id}")
    public ResponseEntity<Place> updatePlace(
            @PathVariable Long id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) Integer pricePerMonth,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) String ownerEmail,
            @RequestParam(required = false) String ownerPhone,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(name = "images", required = false) MultipartFile[] images
    ) throws Exception {
        return ResponseEntity.ok(placeService.updatePlace(
                id, title, city, capacity, pricePerMonth, description, address, ownerEmail, ownerPhone, latitude, longitude, images
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlace(@PathVariable Long id) {
        placeService.deletePlace(id);
        return ResponseEntity.noContent().build();
    }

}

