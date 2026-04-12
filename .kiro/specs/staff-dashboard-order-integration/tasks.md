# Implementation Plan: Staff Dashboard Order Integration

## Overview

This implementation plan converts the design into actionable coding tasks for integrating real-time order management and canteen search functionality into the staff dashboard. The implementation follows a bottom-up approach: backend API endpoints first, then frontend integration, ensuring each step builds on previous work with incremental validation.

## Tasks

- [ ] 1. Extend Order entity and repository with new status values and query methods
  - Add PREPARING, READY, COMPLETED to OrderStatus enum in Order.java
  - Add query methods to Orderrepo: findByCanteenIdAndStatus, findByCanteenIdAndCreatedAtBetween, findByCanteenIdAndStatusAndCreatedAtBetween
  - _Requirements: 1.1, 2.3, 7.6_

- [ ] 2. Create DTOs for order management
  - [ ] 2.1 Create OrderResponse DTO with orderId, studentName, items, amount, status, createdAt, updatedAt fields
    - _Requirements: 1.2, 2.4_
  
  - [ ] 2.2 Create OrderDetailResponse DTO with full order details including parsed items list
    - _Requirements: 4.1, 4.3, 4.4_
  
  - [ ] 2.3 Create OrderStatusUpdateRequest DTO with validation annotations
    - _Requirements: 3.4_
  
  - [ ] 2.4 Create CanteenSearchResponse DTO with canteen details
    - _Requirements: 5.4_
  
  - [ ] 2.5 Create OrderItem nested class for parsed items structure
    - _Requirements: 4.3_

- [ ] 3. Implement service layer methods in StaffDashboardService
  - [ ] 3.1 Implement getAllOrders method with canteen filtering and student name resolution
    - Extract canteen ID from authenticated user email
    - Query orders by canteen ID
    - Resolve studentId to student name for each order
    - Sort by createdAt descending
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 2.1, 2.3, 4.2_
  
  - [ ]* 3.2 Write property test for getAllOrders
    - **Property 1: Orders Filtered by Authenticated Canteen**
    - **Validates: Requirements 1.1, 2.3**
  
  - [ ]* 3.3 Write property test for order response completeness
    - **Property 2: Order Response Contains Required Fields**
    - **Validates: Requirements 1.2, 2.4**
  
  - [ ]* 3.4 Write property test for order sorting
    - **Property 3: Orders Sorted Descending by Creation Time**
    - **Validates: Requirements 1.4**
  
  - [ ] 3.5 Implement getOrderDetail method with items JSON parsing
    - Fetch order by ID
    - Validate order belongs to staff's canteen
    - Parse items JSON string into OrderItem list
    - Resolve student details
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [ ]* 3.6 Write property test for items JSON parsing
    - **Property 11: Items JSON Parsing**
    - **Validates: Requirements 4.3**
  
  - [ ] 3.7 Implement updateOrderStatus method with validation and authorization
    - Validate status is PREPARING, READY, or COMPLETED
    - Fetch order and verify ownership
    - Update status and updatedAt timestamp
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.7_
  
  - [ ]* 3.8 Write property test for status update validation
    - **Property 7: Status Update Validation**
    - **Validates: Requirements 3.4**
  
  - [ ]* 3.9 Write property test for timestamp update
    - **Property 8: Status Update Modifies Timestamp**
    - **Validates: Requirements 3.5**
  
  - [ ]* 3.10 Write property test for cross-canteen authorization
    - **Property 9: Cross-Canteen Update Returns 403**
    - **Validates: Requirements 3.7**
  
  - [ ] 3.11 Implement filterOrders method with status and date range filtering
    - Support optional status filter
    - Support optional date range filter
    - Combine filters when both provided
    - _Requirements: 7.2, 7.3, 7.4, 7.6_
  
  - [ ]* 3.12 Write property test for combined filtering
    - **Property 14: Combined Filtering Works Correctly**
    - **Validates: Requirements 7.2, 7.3, 7.4**
  
  - [ ] 3.13 Implement searchCanteenByCode method
    - Query canteen by canteen code
    - Return 404 if not found
    - Map to CanteenSearchResponse DTO
    - _Requirements: 5.2, 5.3, 5.4, 5.5_
  
  - [ ]* 3.14 Write property test for canteen search response completeness
    - **Property 12: Canteen Search Response Completeness**
    - **Validates: Requirements 5.4**
  
  - [ ]* 3.15 Write property test for non-existent canteen
    - **Property 13: Non-Existent Canteen Returns 404**
    - **Validates: Requirements 5.5**

- [ ] 4. Checkpoint - Ensure service layer tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement controller endpoints in StaffDashboardController
  - [ ] 5.1 Add GET /staff/orders endpoint with authentication
    - Extract Authentication from security context
    - Call service getAllOrders method
    - Return ResponseEntity with order list
    - _Requirements: 2.1, 2.2, 2.5_
  
  - [ ] 5.2 Add GET /staff/orders/{orderId} endpoint for order details
    - Extract orderId from path variable
    - Call service getOrderDetail method
    - Handle 404 if order not found
    - Handle 403 if order belongs to different canteen
    - _Requirements: 4.1, 4.5_
  
  - [ ] 5.3 Add PUT /staff/orders/{orderId}/status endpoint for status updates
    - Extract orderId and request body
    - Validate request using @Valid annotation
    - Call service updateOrderStatus method
    - Return updated order response
    - _Requirements: 3.2, 3.3, 3.6_
  
  - [ ] 5.4 Add GET /staff/orders/filter endpoint with query parameters
    - Accept optional status and date range parameters
    - Call service filterOrders method
    - Return filtered order list
    - _Requirements: 7.1, 7.2, 7.3, 7.6_
  
  - [ ] 5.5 Add GET /staff/canteen/search endpoint with canteenCode parameter
    - Extract canteenCode query parameter
    - Call service searchCanteenByCode method
    - Return canteen details or 404
    - _Requirements: 5.2, 5.3, 5.5, 5.6_
  
  - [ ]* 5.6 Write integration tests for all controller endpoints
    - Test authentication requirements
    - Test authorization for cross-canteen access
    - Test error responses (401, 403, 404, 400)
    - _Requirements: 2.2, 2.5, 3.7, 8.1_

- [ ] 6. Implement error handling in GlobalExceptionHandler
  - Add handler for invalid status values returning 400
  - Add handler for order not found returning 404
  - Add handler for canteen not found returning 404
  - Add handler for access denied returning 403
  - Ensure all error responses include descriptive messages
  - _Requirements: 3.4, 4.5, 5.5, 8.1_

- [ ] 7. Checkpoint - Ensure backend integration tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Create frontend custom hook for order management
  - [ ] 8.1 Create useOrders hook with polling mechanism
    - Implement state management for orders, loading, and error
    - Implement polling with 30-second interval using useEffect
    - Implement cleanup to stop polling on unmount
    - Fetch orders from /staff/orders endpoint with JWT token
    - _Requirements: 1.1, 1.3, 6.1, 6.2, 6.3_
  
  - [ ] 8.2 Add refreshOrders function for manual refresh
    - _Requirements: 6.5_
  
  - [ ] 8.3 Add updateOrderStatus function
    - Send PUT request to /staff/orders/{orderId}/status
    - Refresh orders after successful update
    - Handle errors and display messages
    - _Requirements: 3.1, 3.2, 3.6_
  
  - [ ] 8.4 Implement authentication error handling
    - Detect 401 responses
    - Clear JWT token from localStorage
    - Redirect to login page
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [ ] 8.5 Implement network error handling with retry logic
    - Detect network failures
    - Retry up to 3 times with 5-second delay
    - Display error messages
    - _Requirements: 10.1, 10.2, 10.3, 10.4_
  
  - [ ]* 8.6 Write unit tests for useOrders hook
    - Test polling mechanism
    - Test manual refresh
    - Test error handling
    - _Requirements: 6.1, 8.1, 10.1_

- [ ] 9. Create OrderList component for displaying orders
  - [ ] 9.1 Create OrderList component with order rows
    - Display order ID, student name, items, amount, status, timestamp
    - Implement status badge with color coding
    - Add click handler for order details
    - _Requirements: 1.2, 4.1_
  
  - [ ] 9.2 Add status update dropdown for each order
    - Dropdown with PREPARING, READY, COMPLETED options
    - Call updateOrderStatus on selection
    - Disable during update operation
    - _Requirements: 3.1_
  
  - [ ] 9.3 Add loading and error states
    - Display loading spinner while fetching
    - Display error message on failure
    - _Requirements: 10.1_
  
  - [ ]* 9.4 Write unit tests for OrderList component
    - Test rendering with different order data
    - Test status update interaction
    - Test error display
    - _Requirements: 1.2, 3.1_

- [ ] 10. Create OrderDetailModal component
  - [ ] 10.1 Create modal component with order detail display
    - Fetch order details from /staff/orders/{orderId}
    - Display student name, email, parsed items list
    - Display payment information
    - Add close button
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [ ] 10.2 Implement items list parsing and display
    - Parse items JSON into structured list
    - Display item name, quantity, price for each item
    - _Requirements: 4.3_
  
  - [ ]* 10.3 Write unit tests for OrderDetailModal
    - Test modal open/close
    - Test data fetching
    - Test items display
    - _Requirements: 4.1, 4.3_

- [ ] 11. Create CanteenSearch component
  - [ ] 11.1 Create search input and button
    - Input field for canteen code
    - Search button to trigger search
    - _Requirements: 5.1_
  
  - [ ] 11.2 Implement search functionality
    - Send GET request to /staff/canteen/search
    - Display search results with canteen details
    - Handle 404 with "No results found" message
    - _Requirements: 5.2, 5.3, 5.5, 5.6_
  
  - [ ]* 11.3 Write unit tests for CanteenSearch
    - Test search submission
    - Test results display
    - Test error handling
    - _Requirements: 5.1, 5.2, 5.5_

- [ ] 12. Implement order filtering in frontend
  - [ ] 12.1 Add filter controls for status and date range
    - Status dropdown with all status options
    - Date range picker for start and end dates
    - Clear filters button
    - _Requirements: 7.1, 7.5_
  
  - [ ] 12.2 Implement filter logic
    - Send filter parameters to /staff/orders/filter endpoint
    - Update order list with filtered results
    - Support multiple filters simultaneously
    - _Requirements: 7.2, 7.3, 7.4_
  
  - [ ]* 12.3 Write unit tests for filtering
    - Test filter application
    - Test clear filters
    - Test multiple filters
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 13. Update StaffDash component to integrate order management
  - [ ] 13.1 Replace hardcoded orders with useOrders hook
    - Remove hardcoded order data
    - Use orders from useOrders hook
    - _Requirements: 1.1, 1.3_
  
  - [ ] 13.2 Add OrderList component to orders tab
    - Pass orders and handlers to OrderList
    - Handle order click to open detail modal
    - _Requirements: 1.2, 4.1_
  
  - [ ] 13.3 Add OrderDetailModal with state management
    - Track selected order ID
    - Open/close modal on order click
    - _Requirements: 4.1, 4.5_
  
  - [ ] 13.4 Add CanteenSearch component to appropriate section
    - _Requirements: 5.1, 5.6_
  
  - [ ] 13.5 Add last refresh timestamp display
    - Display timestamp of last successful fetch
    - Update on each refresh
    - _Requirements: 6.4_
  
  - [ ] 13.6 Add manual refresh button
    - Call refreshOrders on click
    - _Requirements: 6.5_

- [ ] 14. Implement dashboard statistics calculation
  - [ ] 14.1 Add methods to calculate today's order count and revenue
    - Count orders created today
    - Sum amounts from PAID and COMPLETED orders
    - _Requirements: 9.1, 9.2_
  
  - [ ] 14.2 Add method to calculate growth percentage
    - Compare today's metrics with yesterday's
    - Handle division by zero
    - _Requirements: 9.3_
  
  - [ ] 14.3 Update overview tab to display calculated statistics
    - Replace hardcoded stats with calculated values
    - Update on order refresh
    - _Requirements: 9.4, 9.5_
  
  - [ ]* 14.4 Write property tests for statistics calculations
    - **Property 15: Today's Order Count Accuracy**
    - **Property 16: Today's Revenue Calculation**
    - **Property 17: Growth Percentage Calculation**
    - **Validates: Requirements 9.1, 9.2, 9.3**

- [ ] 15. Final checkpoint - End-to-end validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Backend tasks (1-7) should be completed before frontend tasks (8-14)
- Property tests validate universal correctness properties from the design
- Integration tests ensure end-to-end functionality
- The implementation uses existing authentication and database infrastructure
