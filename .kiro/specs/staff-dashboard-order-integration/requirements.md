# Requirements Document

## Introduction

This document specifies the requirements for integrating real-time order management and canteen search functionality into the staff dashboard of a canteen management system. The feature enables staff members to view, manage, and track student orders in real-time, replacing the current hardcoded order display with live data from the backend. Additionally, staff can search for canteen information using canteen codes.

## Glossary

- **Staff_Dashboard**: The web interface used by canteen staff to manage operations
- **Order_Management_System**: The backend system that processes and stores student orders
- **Order**: A purchase request from a student containing items, amount, and status
- **Order_Status**: The current state of an order (CREATED, PENDING, PAID, FAILED, CANCELLED, PREPARING, READY, COMPLETED)
- **Canteen_Search**: The functionality allowing staff to retrieve canteen information by canteen code
- **Real_Time_Updates**: Order data refreshed at regular intervals to show current state
- **Student**: A user who places orders through the student dashboard
- **Staff_Member**: An authenticated canteen employee using the staff dashboard
- **Backend_API**: The Spring Boot REST API providing order and canteen data
- **Frontend_Client**: The React TypeScript application displaying the staff dashboard
- **JWT_Token**: The authentication token stored in localStorage for API requests
- **Polling_Interval**: The time period between automatic data refresh requests

## Requirements

### Requirement 1: Display Real-Time Orders

**User Story:** As a staff member, I want to see real-time orders from students in my canteen, so that I can prepare and fulfill orders promptly.

#### Acceptance Criteria

1. WHEN THE Staff_Member accesses the Staff_Dashboard, THE Order_Management_System SHALL retrieve all orders for the authenticated staff member's canteen
2. THE Order_Management_System SHALL display order ID, customer name, items list, amount, status, and timestamp for each order
3. WHEN a new order is placed by a Student, THE Frontend_Client SHALL display the new order within the Polling_Interval
4. THE Order_Management_System SHALL sort orders by creation timestamp in descending order
5. WHEN THE Staff_Member views the orders tab, THE Frontend_Client SHALL display all orders without pagination limits

### Requirement 2: Retrieve Orders from Backend

**User Story:** As a staff member, I want the system to fetch orders from the backend API, so that I see accurate and current order data.

#### Acceptance Criteria

1. THE Backend_API SHALL provide an endpoint at /staff/orders that returns orders for the authenticated canteen
2. WHEN THE Frontend_Client requests orders, THE Backend_API SHALL require a valid JWT_Token in the Authorization header
3. THE Backend_API SHALL filter orders by the canteen ID associated with the authenticated Staff_Member
4. THE Backend_API SHALL return order data including orderId, studentId, items, amount, status, and createdAt fields
5. IF THE JWT_Token is invalid or missing, THEN THE Backend_API SHALL return HTTP 401 Unauthorized

### Requirement 3: Update Order Status

**User Story:** As a staff member, I want to update order status to Preparing, Ready, or Completed, so that students know the progress of their orders.

#### Acceptance Criteria

1. THE Staff_Dashboard SHALL display status update controls for each order
2. WHEN THE Staff_Member selects a new status, THE Frontend_Client SHALL send a PUT request to update the order
3. THE Backend_API SHALL provide an endpoint at /staff/orders/{orderId}/status accepting status updates
4. THE Backend_API SHALL validate that the new status is one of: PREPARING, READY, COMPLETED
5. THE Backend_API SHALL update the Order_Status and updatedAt timestamp in the database
6. WHEN THE status update succeeds, THE Frontend_Client SHALL refresh the order list to reflect the change
7. IF THE order does not belong to the Staff_Member's canteen, THEN THE Backend_API SHALL return HTTP 403 Forbidden

### Requirement 4: View Order Details

**User Story:** As a staff member, I want to view detailed information about an order, so that I can see the complete list of items and customer information.

#### Acceptance Criteria

1. WHEN THE Staff_Member clicks on an order, THE Frontend_Client SHALL display a detailed view with all order information
2. THE Order_Management_System SHALL display the student name by resolving the studentId
3. THE Order_Management_System SHALL parse and display the items field as a structured list
4. THE Frontend_Client SHALL display payment information including razorpayOrderId and paymentMethod
5. THE Frontend_Client SHALL provide a close or back action to return to the order list

### Requirement 5: Search Canteen by Code

**User Story:** As a staff member, I want to search for canteen information using a canteen code, so that I can quickly access canteen details.

#### Acceptance Criteria

1. THE Staff_Dashboard SHALL provide a search input field for canteen code
2. WHEN THE Staff_Member enters a canteen code and submits, THE Frontend_Client SHALL send a GET request to /staff/canteen/search
3. THE Backend_API SHALL accept a query parameter canteenCode for the search
4. WHEN a matching canteen is found, THE Backend_API SHALL return canteen details including canteenId, name, location, and contact information
5. IF no canteen matches the code, THEN THE Backend_API SHALL return HTTP 404 Not Found with a descriptive message
6. THE Frontend_Client SHALL display the search results in a readable format

### Requirement 6: Automatic Order Refresh

**User Story:** As a staff member, I want orders to refresh automatically, so that I see new orders without manually reloading the page.

#### Acceptance Criteria

1. THE Frontend_Client SHALL implement polling to fetch orders at a Polling_Interval of 30 seconds
2. WHEN THE Staff_Member is viewing the orders tab, THE Frontend_Client SHALL execute the polling mechanism
3. WHEN THE Staff_Member navigates away from the orders tab, THE Frontend_Client SHALL stop the polling mechanism
4. THE Frontend_Client SHALL display a visual indicator showing the last refresh timestamp
5. THE Frontend_Client SHALL provide a manual refresh button for immediate updates

### Requirement 7: Filter Order History

**User Story:** As a staff member, I want to filter orders by status and date range, so that I can find specific orders quickly.

#### Acceptance Criteria

1. THE Staff_Dashboard SHALL provide filter controls for Order_Status and date range
2. WHEN THE Staff_Member selects a status filter, THE Frontend_Client SHALL display only orders matching that status
3. WHEN THE Staff_Member selects a date range, THE Frontend_Client SHALL display only orders within that range
4. THE Frontend_Client SHALL support filtering by multiple criteria simultaneously
5. THE Frontend_Client SHALL provide a clear filters action to reset all filters
6. THE Backend_API SHALL support query parameters for status and date range filtering

### Requirement 8: Handle Authentication Errors

**User Story:** As a staff member, I want clear error messages when authentication fails, so that I know to log in again.

#### Acceptance Criteria

1. WHEN THE Backend_API returns HTTP 401 Unauthorized, THE Frontend_Client SHALL display an authentication error message
2. THE Frontend_Client SHALL redirect the Staff_Member to the login page after displaying the error
3. THE Frontend_Client SHALL clear the JWT_Token from localStorage when authentication fails
4. THE Frontend_Client SHALL preserve the current page URL to redirect back after successful login

### Requirement 9: Display Order Statistics

**User Story:** As a staff member, I want to see order statistics on the overview tab, so that I can monitor canteen performance.

#### Acceptance Criteria

1. THE Order_Management_System SHALL calculate today's total orders count
2. THE Order_Management_System SHALL calculate today's total revenue from PAID and COMPLETED orders
3. THE Order_Management_System SHALL calculate the percentage growth compared to yesterday
4. THE Staff_Dashboard SHALL display these statistics in the overview tab stat cards
5. THE Order_Management_System SHALL update statistics when orders are refreshed

### Requirement 10: Handle Network Errors

**User Story:** As a staff member, I want to see error messages when the network fails, so that I know the system is experiencing connectivity issues.

#### Acceptance Criteria

1. WHEN THE Frontend_Client fails to connect to the Backend_API, THE Frontend_Client SHALL display a network error message
2. THE Frontend_Client SHALL retry the request after a 5-second delay
3. THE Frontend_Client SHALL limit retries to 3 attempts before showing a persistent error
4. THE Frontend_Client SHALL provide a retry button for manual retry attempts
5. WHEN THE connection is restored, THE Frontend_Client SHALL automatically resume normal operation
