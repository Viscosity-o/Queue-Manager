package com.example.canteen.Controllers;

import com.example.canteen.dao.Canteenrepo;
import com.example.canteen.dao.Studentrepo;
import com.example.canteen.dto.CanteenResponse;
import com.example.canteen.entity.Canteen;
import com.example.canteen.entity.studentable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "https://main.d2p2ult8kyt0kl.amplifyapp.com"})
@RestController
@RequestMapping("/Student")
public class StudentController {
    
    private final Studentrepo studentRepo;
    private final Canteenrepo canteenRepo;
    
    public StudentController(Studentrepo studentRepo, Canteenrepo canteenRepo) {
        this.studentRepo = studentRepo;
        this.canteenRepo = canteenRepo;
    }
    
    @GetMapping("/dash")
    public String studentdash(){
        return "welcome to the student dashboard";
    }

    @GetMapping("/info")
    public String info(){
        return "Student endpoint is working";
    }
    
    @GetMapping("/canteens")
    public ResponseEntity<List<CanteenResponse>> getCanteensByCollegeCode(Authentication authentication) {
        String email = authentication.getName();
        
        // Get student's college code
        studentable student = studentRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        String collegeCode = student.getCollegeCode();
        
        if (collegeCode == null || collegeCode.isEmpty()) {
            // If no college code, return all active canteens
            List<CanteenResponse> canteens = canteenRepo.findAll().stream()
                    .filter(Canteen::getIsActive)
                    .map(this::mapToCanteenResponse)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(canteens);
        }
        
        // Filter canteens by college code
        List<CanteenResponse> canteens = canteenRepo.findByCollegeCode(collegeCode).stream()
                .filter(Canteen::getIsActive)
                .map(this::mapToCanteenResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(canteens);
    }
    
    @GetMapping("/canteen/search")
    public ResponseEntity<?> searchCanteenByCode(
            @RequestParam String canteenCode,
            Authentication authentication) {
        // Find canteen by code
        Canteen canteen = canteenRepo.findByCanteenCode(canteenCode)
                .orElse(null);
        
        if (canteen == null) {
            return ResponseEntity.status(404)
                    .body(Map.of("error", "Canteen not found with code: " + canteenCode));
        }
        
        // Check if canteen is active
        if (!canteen.getIsActive()) {
            return ResponseEntity.status(404)
                    .body(Map.of("error", "Canteen is not currently active"));
        }
        
        CanteenResponse response = mapToCanteenResponse(canteen);
        return ResponseEntity.ok(response);
    }
    
    private CanteenResponse mapToCanteenResponse(Canteen canteen) {
        return CanteenResponse.builder()
                .canteenId(canteen.getCanteenId())
                .name(canteen.getName())
                .canteenCode(canteen.getCanteenCode())
                .collegeCode(canteen.getCollegeCode())
                .address(canteen.getAddress())
                .phone(canteen.getPhone())
                .isActive(canteen.getIsActive())
                .build();
    }
}
