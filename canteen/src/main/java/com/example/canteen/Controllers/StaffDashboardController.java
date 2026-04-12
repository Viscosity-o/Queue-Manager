package com.example.canteen.Controllers;

import com.example.canteen.dto.*;
import com.example.canteen.entity.DashboardStats;
import com.example.canteen.services.StaffDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/staff")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "https://main.d2p2ult8kyt0kl.amplifyapp.com"})
public class StaffDashboardController {

    private final StaffDashboardService staffDashboardService;

    public StaffDashboardController(StaffDashboardService staffDashboardService) {
        this.staffDashboardService = staffDashboardService;
    }

    // Dashboard Stats
    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStats> getDashboardStats(Authentication authentication) {
        String email = authentication.getName();
        DashboardStats stats = staffDashboardService.getDashboardStats(email);
        return ResponseEntity.ok(stats);
    }

    // Inventory Management Endpoints
    @GetMapping("/inventory")
    public ResponseEntity<List<InventoryItemResponse>> getAllInventoryItems(Authentication authentication) {
        String email = authentication.getName();
        List<InventoryItemResponse> items = staffDashboardService.getAllInventoryItems(email);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/inventory")
    public ResponseEntity<InventoryItemResponse> addInventoryItem(
            Authentication authentication,
            @RequestBody InventoryItemRequest request) {
        String email = authentication.getName();
        InventoryItemResponse response = staffDashboardService.addInventoryItem(email, request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/inventory/{itemId}")
    public ResponseEntity<InventoryItemResponse> updateInventoryItem(
            Authentication authentication,
            @PathVariable UUID itemId,
            @RequestBody InventoryItemRequest request) {
        String email = authentication.getName();
        InventoryItemResponse response = staffDashboardService.updateInventoryItem(email, itemId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/inventory/{itemId}")
    public ResponseEntity<Void> deleteInventoryItem(
            Authentication authentication,
            @PathVariable UUID itemId) {
        String email = authentication.getName();
        staffDashboardService.deleteInventoryItem(email, itemId);
        return ResponseEntity.noContent().build();
    }

    // Menu Management Endpoints
    @GetMapping("/menu")
    public ResponseEntity<List<MenuItemResponse>> getAllMenuItems(Authentication authentication) {
        String email = authentication.getName();
        List<MenuItemResponse> items = staffDashboardService.getAllMenuItems(email);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/menu")
    public ResponseEntity<MenuItemResponse> addMenuItem(
            Authentication authentication,
            @RequestBody MenuItemRequest request) {
        String email = authentication.getName();
        MenuItemResponse response = staffDashboardService.addMenuItem(email, request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/menu/{menuItemId}")
    public ResponseEntity<MenuItemResponse> updateMenuItem(
            Authentication authentication,
            @PathVariable UUID menuItemId,
            @RequestBody MenuItemRequest request) {
        String email = authentication.getName();
        MenuItemResponse response = staffDashboardService.updateMenuItem(email, menuItemId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/menu/{menuItemId}")
    public ResponseEntity<Void> deleteMenuItem(
            Authentication authentication,
            @PathVariable UUID menuItemId) {
        String email = authentication.getName();
        staffDashboardService.deleteMenuItem(email, menuItemId);
        return ResponseEntity.noContent().build();
    }
}
