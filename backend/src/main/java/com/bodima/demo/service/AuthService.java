package com.bodima.demo.service;

import com.bodima.demo.dto.LoginRequest;
import com.bodima.demo.entity.User;
import com.bodima.demo.repositary.UserRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Service
public class AuthService {

    private static final Duration RESET_TOKEN_TTL = Duration.ofMinutes(15);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.frontend.base-url}")
    private String frontendBaseUrl;

    @Value("${app.mail.from}")
    private String mailFrom;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    public User registerUser(User user) {
        if (user.getEmail() != null) {
            user.setEmail(user.getEmail().trim());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Map<String, Object> login(LoginRequest loginData) {
        User user = userRepository.findByEmail(loginData.getEmail());
        if (user == null) {
            return null;
        }

        boolean matches = passwordEncoder.matches(loginData.getPassword(), user.getPassword());
        if (!matches && loginData.getPassword().equals(user.getPassword())) {
            // Legacy plain-text password fallback; upgrade to bcrypt on successful login.
            user.setPassword(passwordEncoder.encode(loginData.getPassword()));
            userRepository.save(user);
            matches = true;
        }

        if (!matches) {
            return null;
        }

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        return response;
    }

    public void requestPasswordReset(String rawEmail) {
        if (rawEmail == null || rawEmail.isBlank()) {
            return;
        }

        String email = rawEmail.trim();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return;
        }

        String token = generateToken();
        user.setResetToken(token);
        user.setResetTokenExpiry(Instant.now().plus(RESET_TOKEN_TTL));
        userRepository.save(user);

        sendResetEmail(email, token);
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new ResponseStatusException(BAD_REQUEST, "Invalid or expired token"));

        Instant expiry = user.getResetTokenExpiry();
        if (expiry == null || expiry.isBefore(Instant.now())) {
            throw new ResponseStatusException(BAD_REQUEST, "Invalid or expired token");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
    }

    private String generateToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private void sendResetEmail(String to, String token) {
        String baseUrl = frontendBaseUrl == null ? "" : frontendBaseUrl.replaceAll("/+$", "");
        String encodedToken = URLEncoder.encode(token, StandardCharsets.UTF_8);
        String resetLink = baseUrl + "/reset-password?token=" + encodedToken;

        String html = "<p>We received a request to reset your password.</p>"
                + "<p><a href=\"" + resetLink + "\">Reset your password</a></p>"
                + "<p>If you did not request this, you can safely ignore this email.</p>";

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setTo(to);
            helper.setFrom(mailFrom);
            helper.setSubject("Reset your password");
            helper.setText(html, true);
            mailSender.send(message);
        } catch (Exception ex) {
            throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "Failed to send reset email");
        }
    }
}
