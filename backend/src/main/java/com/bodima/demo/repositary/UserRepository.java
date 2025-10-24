package com.bodima.demo.repositary;

import com.bodima.demo.entity.User;
import com.bodima.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}