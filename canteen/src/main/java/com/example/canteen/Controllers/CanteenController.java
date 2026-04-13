package com.example.canteen.Controllers;

import com.example.canteen.dao.Canteenrepo;
import com.example.canteen.dao.MenuItemRepository;
import com.example.canteen.dto.MenuItemRequest;
import com.example.canteen.dto.MenuItemResponse;
import com.example.canteen.entity.Canteen;
import com.example.canteen.entity.MenuItem;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "https://main.d2p2ult8kyt0kl.amplifyapp.com"})
@RestController
@RequestMapping("/Canteen")
public class CanteenController {
    
    private final Canteenrepo canteenRepo;
    private final MenuItemRepository menuItemRepo;
    
    public CanteenController(Canteenrepo canteenRepo, MenuItemRepository menuItemRepo) {
        this.canteenRepo = canteenRepo;
        this.menuItemRepo = menuItemRepo;
    }
    
    @GetMapping("/dash")
    public String Canteendash(){
        return"welcome to canteen";
    }
    
    @GetMapping("/info")
    public String info(){
        return "Canteen endpoint is working";
    }
    
    @GetMapping("/menu")
    public ResponseEntity<?> getMyMenuItems(Authentication authentication) {
        String email = authentication.getName();
        
        // Get canteen by email
        Canteen canteen = canteenRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Canteen not found"));
        
        // Get all menu items for this canteen
        List<MenuItem> menuItems = menuItemRepo.findByCanteen(canteen);
        
        // Map to response DTOs
        List<MenuItemResponse> menuResponses = menuItems.stream()
                .map(this::mapToMenuItemResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(menuResponses);
    }
    
    @PostMapping("/menu")
    public ResponseEntity<?> addMenuItem(
            @RequestBody MenuItemRequest request,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            
            // Get canteen by email
            Canteen canteen = canteenRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Canteen not found"));
            
            // Create new menu item
            MenuItem menuItem = MenuItem.builder()
                    .canteen(canteen)
                    .name(request.getName())
                    .category(request.getCategory())
                    .price(request.getPrice())
                    .description(request.getDescription())
                    .isAvailable(true)
                    .stockStatus("Available")
                    .image(request.getImage())
                    .build();
            
            // Save to database
            MenuItem savedItem = menuItemRepo.save(menuItem);
            
            // Return response
            MenuItemResponse response = mapToMenuItemResponse(savedItem);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Failed to add menu item: " + e.getMessage()));
        }
    }
    
    private MenuItemResponse mapToMenuItemResponse(MenuItem menuItem) {
        return MenuItemResponse.builder()
                .menuItemId(menuItem.getMenuItemId())
                .name(menuItem.getName())
                .category(menuItem.getCategory())
                .price(menuItem.getPrice())
                .description(menuItem.getDescription())
                .isAvailable(menuItem.getIsAvailable())
                .stockStatus(menuItem.getStockStatus())
                .image(menuItem.getImage())
                .build();
    }
}
