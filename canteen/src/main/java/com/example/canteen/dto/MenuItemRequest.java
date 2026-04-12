package com.example.canteen.dto;

import lombok.Data;

@Data
public class MenuItemRequest {
    private String name;
    private String category;
    private Double price;
    private String description;
    private Boolean isAvailable;
    private String stockStatus;
    private String image;
}
