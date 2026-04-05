package com.example.canteen.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "canteens")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Canteen {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "canteen_id", updatable = false, nullable = false)
    private UUID canteenId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "canteen_code", nullable = false, unique = true, length = 10)
    private String canteenCode;

    private String address;

    private String phone;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}