package com.example.canteen.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuItemResponse {
    private UUID menuItemId;
    private String name;
    private String category;
    private Double price;
    private String description;
    private Boolean isAvailable;
    private String stockStatus;
    private String image;
}
