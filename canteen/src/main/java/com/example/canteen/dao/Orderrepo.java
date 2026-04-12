package com.example.canteen.dao;

import com.example.canteen.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface Orderrepo extends JpaRepository<Order, UUID> {
    Optional<Order> findByRazorpayOrderId(String razorpayOrderId);
    List<Order> findByCanteenIdAndCreatedAtAfter(UUID canteenId, LocalDateTime startDate);
    List<Order> findByCanteenId(UUID canteenId);
}
