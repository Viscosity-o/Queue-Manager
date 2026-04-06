package com.example.canteen.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class OrderRequest {
    private UUID studentId;
    private UUID canteenId;
    private Double amount;
    private String currency;
    private List<OrderItem> items;

    @Data
    public static class OrderItem {
        private Long itemId;
        private String name;
        private Integer quantity;
        private Double price;
    }
}
