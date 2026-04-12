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
public class CanteenResponse {
    private UUID canteenId;
    private String name;
    private String canteenCode;
    private String collegeCode;
    private String address;
    private String phone;
    private Boolean isActive;
}
