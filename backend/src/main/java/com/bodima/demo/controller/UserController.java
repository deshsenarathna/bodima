package com.bodima.demo.controller;

import com.bodima.demo.entity.User;
import com.bodima.demo.repositary.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // React dev server URL
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Register
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        // Hash the password before saving in production!
        return userRepository.save(user);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        User user = userRepository.findByEmail(loginData.getEmail());

        if (user != null && user.getPassword().equals(loginData.getPassword())) {
            // Build response JSON
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("username", user.getUsername());
            response.put("email", user.getEmail());

            // Return success JSON
            return ResponseEntity.ok(response);
        } else {
            // Return error JSON
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("status", "Invalid credentials"));
        }
    }
}
