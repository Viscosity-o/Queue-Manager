package com.example.canteen.Controllers;

import com.example.canteen.Security.JwtUtil;
import com.example.canteen.dto.LoginRequest;
import com.example.canteen.dto.RegisterCanteenRequest;
import com.example.canteen.dto.RegisterStudentRequest;
import com.example.canteen.entity.Canteen;
import com.example.canteen.entity.Role;
import com.example.canteen.entity.studentable;
import com.example.canteen.services.Canteenservice;
import com.example.canteen.services.Studentservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Studentservice studentservice;

    @Autowired
    private Canteenservice canteenservice;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String role = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("")
                .replace("ROLE_", "");

        String token = jwtUtil.generateToken(request.getEmail(), role);
        return ResponseEntity.ok(Map.of("token", token, "role", role));
    }

    @PostMapping("/register/student")
    public ResponseEntity<?> registerStudent(@RequestBody RegisterStudentRequest request) {
        // Check if email already exists in student or canteen table
        if (studentservice.getStudentByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered as student"));
        }
        if (canteenservice.GetStaffEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered as canteen"));
        }

        studentable student = studentable.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .collegeName(request.getCollegeName())
                .collegeCode(request.getCollegeCode())
                .role(Role.STUDENT)
                .build();

        studentservice.registerStudent(student);
        return ResponseEntity.ok(Map.of("message", "Student registered successfully"));
    }

    @PostMapping("/register/canteen")
    public ResponseEntity<?> registerCanteen(@RequestBody RegisterCanteenRequest request) {
        // Check if email already exists in student or canteen table
        if (studentservice.getStudentByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered as student"));
        }
        if (canteenservice.GetStaffEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered as canteen"));
        }

        Canteen canteen = Canteen.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .canteenCode(request.getCanteenCode())
                .collegeCode(request.getCollegeCode())
                .address(request.getAddress())
                .phone(request.getPhone())
                .role(Role.CANTEEN)
                .isActive(true)
                .build();

        canteenservice.RegisterStaff(canteen);
        return ResponseEntity.ok(Map.of("message", "Canteen registered successfully"));
    }
}
