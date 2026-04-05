package com.example.canteen.dto;

import lombok.Data;

@Data
public class RegisterCanteenRequest {
    private String name;
    private String email;
    private String password;
    private String canteenCode;
    private String address;
    private String phone;
}
