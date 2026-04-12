package com.example.canteen.dto;

import lombok.Data;

@Data
public class RegisterStudentRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private String collegeName;
    private String collegeCode;
}
