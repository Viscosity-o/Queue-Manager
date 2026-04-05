package com.example.canteen.dao;
import com.example.canteen.entity.Canteen;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Canteenrepo extends JpaRepository<Canteen, java.util.UUID> {
    Optional<Canteen> findByEmail(String email);

}
