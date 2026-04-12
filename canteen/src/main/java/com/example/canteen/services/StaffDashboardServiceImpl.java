package com.example.canteen.services;

import com.example.canteen.dao.*;
import com.example.canteen.dto.*;
import com.example.canteen.entity.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class StaffDashboardServiceImpl implements StaffDashboardService {

    private final Canteenrepo canteenRepo;
    private final InventoryItemRepository inventoryRepo;
    private final MenuItemRepository menuItemRepo;
    private final Orderrepo orderRepo;

    public StaffDashboardServiceImpl(Canteenrepo canteenRepo, 
                                     InventoryItemRepository inventoryRepo,
                                     MenuItemRepository menuItemRepo,
                                     Orderrepo orderRepo) {
        this.canteenRepo = canteenRepo;
        this.inventoryRepo = inventoryRepo;
        this.menuItemRepo = menuItemRepo;
        this.orderRepo = orderRepo;
    }

    private Canteen getCanteenByEmail(String email) {
        return canteenRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Canteen not found"));
    }

    @Override
    public DashboardStats getDashboardStats(String email) {
        Canteen canteen = getCanteenByEmail(email);
        
        // Get today's orders
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        List<Order> todayOrders = orderRepo.findByCanteenIdAndCreatedAtAfter(canteen.getCanteenId(), startOfDay);
        
        // Calculate stats
        Double todayRevenue = todayOrders.stream()
                .mapToDouble(Order::getAmount)
                .sum();
        
        Integer todayOrdersCount = todayOrders.size();
        
        // Count low stock items
        Long lowStockCount = inventoryRepo.countByCanteenAndStatus(canteen, "low");
        Long criticalStockCount = inventoryRepo.countByCanteenAndStatus(canteen, "critical");
        
        return DashboardStats.builder()
                .todayRevenue(todayRevenue)
                .todayOrders(todayOrdersCount)
                .avgRating(4.8) // Mock data - implement rating system later
                .lowStockItems(lowStockCount.intValue() + criticalStockCount.intValue())
                .revenueGrowth(12.0) // Mock data
                .ordersGrowth(8.0) // Mock data
                .build();
    }

    @Override
    public List<InventoryItemResponse> getAllInventoryItems(String email) {
        Canteen canteen = getCanteenByEmail(email);
        List<InventoryItem> items = inventoryRepo.findByCanteen(canteen);
        
        return items.stream()
                .map(this::mapToInventoryResponse)
                .collect(Collectors.toList());
    }

    @Override
    public InventoryItemResponse addInventoryItem(String email, InventoryItemRequest request) {
        Canteen canteen = getCanteenByEmail(email);
        
        String status = calculateStatus(request.getQuantity(), request.getMinStock());
        
        InventoryItem item = InventoryItem.builder()
                .canteen(canteen)
                .name(request.getName())
                .category(request.getCategory())
                .quantity(request.getQuantity())
                .unit(request.getUnit())
                .minStock(request.getMinStock())
                .status(status)
                .supplier(request.getSupplier())
                .build();
        
        InventoryItem saved = inventoryRepo.save(item);
        return mapToInventoryResponse(saved);
    }

    @Override
    public InventoryItemResponse updateInventoryItem(String email, UUID itemId, InventoryItemRequest request) {
        Canteen canteen = getCanteenByEmail(email);
        
        InventoryItem item = inventoryRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));
        
        if (!item.getCanteen().getCanteenId().equals(canteen.getCanteenId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        item.setName(request.getName());
        item.setCategory(request.getCategory());
        item.setQuantity(request.getQuantity());
        item.setUnit(request.getUnit());
        item.setMinStock(request.getMinStock());
        item.setSupplier(request.getSupplier());
        item.setStatus(calculateStatus(request.getQuantity(), request.getMinStock()));
        
        InventoryItem updated = inventoryRepo.save(item);
        return mapToInventoryResponse(updated);
    }

    @Override
    public void deleteInventoryItem(String email, UUID itemId) {
        Canteen canteen = getCanteenByEmail(email);
        
        InventoryItem item = inventoryRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));
        
        if (!item.getCanteen().getCanteenId().equals(canteen.getCanteenId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        inventoryRepo.delete(item);
    }

    @Override
    public List<MenuItemResponse> getAllMenuItems(String email) {
        Canteen canteen = getCanteenByEmail(email);
        List<MenuItem> items = menuItemRepo.findByCanteen(canteen);
        
        return items.stream()
                .map(this::mapToMenuItemResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemResponse addMenuItem(String email, MenuItemRequest request) {
        Canteen canteen = getCanteenByEmail(email);
        
        MenuItem item = MenuItem.builder()
                .canteen(canteen)
                .name(request.getName())
                .category(request.getCategory())
                .price(request.getPrice())
                .description(request.getDescription())
                .isAvailable(request.getIsAvailable() != null ? request.getIsAvailable() : true)
                .stockStatus(request.getStockStatus() != null ? request.getStockStatus() : "Available")
                .image(request.getImage())
                .build();
        
        MenuItem saved = menuItemRepo.save(item);
        return mapToMenuItemResponse(saved);
    }

    @Override
    public MenuItemResponse updateMenuItem(String email, UUID menuItemId, MenuItemRequest request) {
        Canteen canteen = getCanteenByEmail(email);
        
        MenuItem item = menuItemRepo.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        
        if (!item.getCanteen().getCanteenId().equals(canteen.getCanteenId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        item.setName(request.getName());
        item.setCategory(request.getCategory());
        item.setPrice(request.getPrice());
        item.setDescription(request.getDescription());
        item.setIsAvailable(request.getIsAvailable());
        item.setStockStatus(request.getStockStatus());
        item.setImage(request.getImage());
        
        MenuItem updated = menuItemRepo.save(item);
        return mapToMenuItemResponse(updated);
    }

    @Override
    public void deleteMenuItem(String email, UUID menuItemId) {
        Canteen canteen = getCanteenByEmail(email);
        
        MenuItem item = menuItemRepo.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
        
        if (!item.getCanteen().getCanteenId().equals(canteen.getCanteenId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        menuItemRepo.delete(item);
    }

    // Helper methods
    private String calculateStatus(Double quantity, Double minStock) {
        if (quantity <= minStock * 0.5) {
            return "critical";
        } else if (quantity <= minStock) {
            return "low";
        } else {
            return "good";
        }
    }

    private InventoryItemResponse mapToInventoryResponse(InventoryItem item) {
        return InventoryItemResponse.builder()
                .itemId(item.getItemId())
                .name(item.getName())
                .category(item.getCategory())
                .quantity(item.getQuantity())
                .unit(item.getUnit())
                .minStock(item.getMinStock())
                .status(item.getStatus())
                .supplier(item.getSupplier())
                .updatedAt(item.getUpdatedAt())
                .build();
    }

    private MenuItemResponse mapToMenuItemResponse(MenuItem item) {
        return MenuItemResponse.builder()
                .menuItemId(item.getMenuItemId())
                .name(item.getName())
                .category(item.getCategory())
                .price(item.getPrice())
                .description(item.getDescription())
                .isAvailable(item.getIsAvailable())
                .stockStatus(item.getStockStatus())
                .image(item.getImage())
                .build();
    }
}
