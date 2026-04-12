package com.example.canteen.services;

import com.example.canteen.dto.*;
import com.example.canteen.entity.DashboardStats;

import java.util.List;
import java.util.UUID;

public interface StaffDashboardService {
    // Dashboard Stats
    DashboardStats getDashboardStats(String email);
    
    // Inventory Management
    List<InventoryItemResponse> getAllInventoryItems(String email);
    InventoryItemResponse addInventoryItem(String email, InventoryItemRequest request);
    InventoryItemResponse updateInventoryItem(String email, UUID itemId, InventoryItemRequest request);
    void deleteInventoryItem(String email, UUID itemId);
    
    // Menu Management
    List<MenuItemResponse> getAllMenuItems(String email);
    MenuItemResponse addMenuItem(String email, MenuItemRequest request);
    MenuItemResponse updateMenuItem(String email, UUID menuItemId, MenuItemRequest request);
    void deleteMenuItem(String email, UUID menuItemId);
}
