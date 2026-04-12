package com.example.canteen.entity;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DashboardStats {
    private Double todayRevenue;
    private Integer todayOrders;
    private Double avgRating;
    private Integer lowStockItems;
    private Double revenueGrowth;
    private Double ordersGrowth;
}
