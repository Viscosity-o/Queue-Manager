package com.example.canteen.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItemResponse {
    private UUID itemId;
    private String name;
    private String category;
    private Double quantity;
    private String unit;
    private Double minStock;
    private String status;
    private String supplier;
    private LocalDateTime updatedAt;
}
