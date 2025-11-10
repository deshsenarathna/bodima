package com.bodima.demo.service;

import com.bodima.demo.entity.Place;
import com.bodima.demo.entity.PlaceImage;
import com.bodima.demo.repositary.PlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.*;
import java.util.*;

@Service
public class PlaceService {

    private final PlaceRepository placeRepository;
    private static final Path UPLOAD_DIR = Paths.get("uploads");

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    // ------------------- Create -------------------
    public Place createPlaceWithImages(
            String title, String city, Integer capacity, Integer pricePerMonth,
            String description, String address, String ownerEmail, String ownerPhone,
            MultipartFile[] images
    ) throws Exception {
        if (!Files.exists(UPLOAD_DIR)) Files.createDirectories(UPLOAD_DIR);

        Place place = new Place();
        place.setTitle(title);
        place.setCity(city);
        place.setCapacity(capacity);
        place.setPricePerMonth(pricePerMonth);
        place.setDescription(description);
        place.setAddress(address);
        place.setOwnerEmail(ownerEmail != null ? ownerEmail.trim() : null);
        place.setOwnerPhone(ownerPhone);

        // Handle uploaded images
        if (images != null) {
            for (MultipartFile file : images) {
                if (file.isEmpty()) continue;
                if (file.getContentType() == null || !file.getContentType().startsWith("image/")) continue;

                String original = Optional.ofNullable(file.getOriginalFilename()).orElse("image.jpg");
                String ext = original.contains(".") ? original.substring(original.lastIndexOf(".")) : ".jpg";
                String stored = UUID.randomUUID() + ext;

                Path target = UPLOAD_DIR.resolve(stored);
                try (InputStream in = file.getInputStream()) {
                    Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
                }
                String url = "/uploads/" + stored;

                var img = new PlaceImage();
                img.setOriginalFilename(original);
                img.setUrl(url);
                place.addImage(img);
            }
        }

        return placeRepository.save(place);
    }

    // ------------------- Read -------------------
    public List<Place> list() {
        return placeRepository.findAll();
    }

    public List<Place> listByOwnerEmail(String ownerEmail) {
        if (ownerEmail == null || ownerEmail.isBlank()) return placeRepository.findAll();
        return placeRepository.findByOwnerEmailIgnoreCase(ownerEmail.trim());
    }

    public Place get(Long id) {
        return placeRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Place not found"));
    }

    // ------------------- Update -------------------
    public Place updatePlace(Long id,
                             String title,
                             String city,
                             Integer capacity,
                             Integer pricePerMonth,
                             String description,
                             String address,
                             String ownerEmail,
                             String ownerPhone,
                             MultipartFile[] images) throws Exception {

        Place place = placeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Place not found"));

        // Optional: verify user owns the post
        if (ownerEmail != null && !ownerEmail.equalsIgnoreCase(place.getOwnerEmail())) {
            throw new SecurityException("Not authorized to edit this post");
        }

        if (title != null) place.setTitle(title);
        if (city != null) place.setCity(city);
        if (capacity != null) place.setCapacity(capacity);
        if (pricePerMonth != null) place.setPricePerMonth(pricePerMonth);
        if (description != null) place.setDescription(description);
        if (address != null) place.setAddress(address);
        if (ownerPhone != null) place.setOwnerPhone(ownerPhone);

        // Handle image upload if new images are provided
        if (images != null) {
            for (MultipartFile file : images) {
                if (file.isEmpty()) continue;
                if (file.getContentType() == null || !file.getContentType().startsWith("image/")) continue;

                String original = Optional.ofNullable(file.getOriginalFilename()).orElse("image.jpg");
                String ext = original.contains(".") ? original.substring(original.lastIndexOf(".")) : ".jpg";
                String stored = UUID.randomUUID() + ext;

                Path target = UPLOAD_DIR.resolve(stored);
                try (InputStream in = file.getInputStream()) {
                    Files.copy(in, target, StandardCopyOption.REPLACE_EXISTING);
                }
                String url = "/uploads/" + stored;

                var img = new PlaceImage();
                img.setOriginalFilename(original);
                img.setUrl(url);
                place.addImage(img);
            }
        }

        return placeRepository.save(place);
    }

    // ------------------- Delete -------------------
    public void deletePlace(Long id) {
        if (!placeRepository.existsById(id)) {
            throw new NoSuchElementException("Place not found");
        }
        placeRepository.deleteById(id);
    }
}
