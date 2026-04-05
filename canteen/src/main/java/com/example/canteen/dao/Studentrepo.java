package com.example.canteen.dao;

import com.example.canteen.entity.studentable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Studentrepo extends JpaRepository<studentable, java.util.UUID> {

    Optional<studentable> findByEmail(String email);

}
