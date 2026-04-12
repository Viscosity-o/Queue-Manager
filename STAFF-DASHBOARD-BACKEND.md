# Staff Dashboard Backend Integration

## Overview
Complete backend implementation for Staff Dashboard with Inventory Management, Menu Management, and KPI tracking.

---

## Backend Components Created

### 1. Entity Classes
- **InventoryItem.java** - Inventory tracking entity
- **MenuItem.java** - Menu items entity
- **DashboardStats.java** - Dashboard statistics DTO

### 2. DTOs
- **InventoryItemRequest.java** - Add/Update inventory request
- **InventoryItemResponse.java** - Inventory item response
- **MenuItemRequest.java** - Add/Update menu item request
- **MenuItemResponse.java** - Menu item response

### 3. Repositories
- **InventoryItemRepository.java** - Inventory CRUD operations
- **MenuItemRepository.java** - Menu CRUD operations
- **Orderrepo.java** - Updated with date filtering methods

### 4. Services
- **StaffDashboardService.java** - Interface
- **StaffDashboardServiceImpl.java** - Implementation with:
  - Dashboard stats calculation
  - Inventory management (CRUD)
  - Menu management (CRUD)
  - Automatic status calculation for inventory

### 5. Controller
- **StaffDashboardController.java** - REST API endpoints

---

## API Endpoints

### Dashboard Stats
```
GET /staff/dashboard/stats
Authorization: Bearer <JWT_TOKEN>
Response: {
  todayRevenue: number,
  todayOrders: number,
  avgRating: number,
  lowStockItems: number,
  revenueGrowth: number,
  ordersGrowth: number
}
```

### Inventory Management
```
GET    /staff/inventory              - Get all inventory items
POST   /staff/inventory              - Add new inventory item
PUT    /staff/inventory/{itemId}     - Update inventory item
DELETE /staff/inventory/{itemId}     - Delete inventory item
```

**Request Body (POST/PUT)**:
```json
{
  "name": "Basmati Rice",
  "category": "Grains",
  "quantity": 45.0,
  "unit": "kg",
  "minStock": 20.0,
  "supplier": "ABC Traders"
}
```

**Response**:
```json
{
  "itemId": "uuid",
  "name": "Basmati Rice",
  "category": "Grains",
  "quantity": 45.0,
  "unit": "kg",
  "minStock": 20.0,
  "status": "good",
  "supplier": "ABC Traders",
  "updatedAt": "2024-03-23T10:30:00"
}
```

### Menu Management
```
GET    /staff/menu              - Get all menu items
POST   /staff/menu              - Add new menu item
PUT    /staff/menu/{menuItemId} - Update menu item
DELETE /staff/menu/{menuItemId} - Delete menu item
```

**Request Body (POST/PUT)**:
```json
{
  "name": "Masala Dosa",
  "category": "South Indian",
  "price": 150.0,
  "description": "Crispy dosa with potato filling",
  "isAvailable": true,
  "stockStatus": "Available",
  "image": "🥞"
}
```

---

## Frontend Integration

### Updated Files
1. **src/config/api.ts** - Added staff endpoints
2. **StaffDash.tsx** - Fetches real dashboard stats
3. **InventoryTracking.tsx** - Full CRUD with backend
4. **KPIDashboard.tsx** - Ready for backend integration

### Authentication
All staff endpoints require JWT token:
```typescript
const token = localStorage.getItem('token');
fetch(API_ENDPOINTS.STAFF_DASHBOARD_STATS, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

---

## Database Schema

### inventory_items Table
```sql
CREATE TABLE inventory_items (
  item_id UUID PRIMARY KEY,
  canteen_id UUID NOT NULL REFERENCES canteens(canteen_id),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  quantity DOUBLE PRECISION NOT NULL,
  unit VARCHAR(50) NOT NULL,
  min_stock DOUBLE PRECISION NOT NULL,
  status VARCHAR(20) NOT NULL,
  supplier VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### menu_items Table
```sql
CREATE TABLE menu_items (
  menu_item_id UUID PRIMARY KEY,
  canteen_id UUID NOT NULL REFERENCES canteens(canteen_id),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  description VARCHAR(500),
  is_available BOOLEAN NOT NULL DEFAULT true,
  stock_status VARCHAR(50),
  image VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## Features Implemented

### ✅ Dashboard Stats
- Real-time revenue calculation
- Today's order count
- Average rating (mock - ready for rating system)
- Low stock alerts
- Growth percentages

### ✅ Inventory Management
- View all inventory items
- Add new items
- Update quantities
- Delete items
- Automatic status calculation:
  - **Critical**: quantity ≤ 50% of minStock
  - **Low**: quantity ≤ minStock
  - **Good**: quantity > minStock
- Search and filter by category
- Real-time stats (Total, In Stock, Low, Critical)

### ✅ Menu Management
- View all menu items
- Add new menu items
- Update menu items
- Delete menu items
- Stock status tracking
- Category organization

### ✅ Security
- JWT authentication required
- Canteen-specific data isolation
- Role-based access (CANTEEN role only)
- Unauthorized access prevention

---

## Testing

### 1. Start Backend
```bash
cd canteen
mvn spring-boot:run
```

### 2. Login as Canteen Staff
```bash
POST http://localhost:8080/auth/login
{
  "email": "canteen@example.com",
  "password": "password123"
}
```

### 3. Test Endpoints
```bash
# Get dashboard stats
GET http://localhost:8080/staff/dashboard/stats
Authorization: Bearer <token>

# Get inventory
GET http://localhost:8080/staff/inventory
Authorization: Bearer <token>

# Add inventory item
POST http://localhost:8080/staff/inventory
Authorization: Bearer <token>
{
  "name": "Rice",
  "category": "Grains",
  "quantity": 50,
  "unit": "kg",
  "minStock": 20,
  "supplier": "ABC Traders"
}
```

---

## Next Steps

1. **Deploy Backend** - Follow DEPLOYMENT-GUIDE.md
2. **Add Menu Items** - Populate menu for testing
3. **Add Inventory Items** - Populate inventory for testing
4. **Test Frontend** - Login as canteen staff and test all features
5. **Implement Rating System** - Replace mock rating with real data
6. **Add Order History** - Show recent orders in dashboard

---

## Files Modified/Created

### Backend
- ✅ `entity/InventoryItem.java`
- ✅ `entity/MenuItem.java`
- ✅ `entity/DashboardStats.java`
- ✅ `dto/InventoryItemRequest.java`
- ✅ `dto/InventoryItemResponse.java`
- ✅ `dto/MenuItemRequest.java`
- ✅ `dto/MenuItemResponse.java`
- ✅ `dao/InventoryItemRepository.java`
- ✅ `dao/MenuItemRepository.java`
- ✅ `dao/Orderrepo.java` (updated)
- ✅ `services/StaffDashboardService.java`
- ✅ `services/StaffDashboardServiceImpl.java`
- ✅ `Controllers/StaffDashboardController.java`
- ✅ `Security/SecurityConfig.java` (updated)

### Frontend
- ✅ `src/config/api.ts` (updated)
- ✅ `src/components/StaffDash.tsx` (updated)
- ✅ `src/components/InventoryTracking.tsx` (updated)
- ✅ `src/components/KPIDashboard.tsx` (ready)

---

## Success! 🎉

Your staff dashboard is now fully connected to the backend with:
- Real-time dashboard statistics
- Complete inventory management
- Menu management system
- Secure JWT authentication
- Role-based access control
