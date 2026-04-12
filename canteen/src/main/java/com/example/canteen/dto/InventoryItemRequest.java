package com.example.canteen.dto;

import lombok.Data;

@Data
public class InventoryItemRequest {
    private String name;
    private String category;
    private Double quantity;
    private String unit;
    private Double minStock;
    private String supplier;
}
