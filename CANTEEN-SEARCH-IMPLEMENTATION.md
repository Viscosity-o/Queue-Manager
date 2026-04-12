# Canteen Search Implementation

## Overview
Students can now search for canteens by entering their canteen code in the search bar on the student dashboard. When a canteen is found, it displays the canteen details and provides a button to view the menu.

## Changes Made

### Backend Changes

#### StudentController.java
Added new endpoint `/Student/canteen/search`:
- **Method**: GET
- **Authentication**: Required (JWT)
- **Query Parameter**: `canteenCode` (required)
- **Functionality**:
  - Validates student authentication
  - Searches for canteen by canteen code
  - Checks if canteen is active
  - Validates that canteen belongs to student's college (if college code is set)
  - Returns canteen details or appropriate error message

**Response Codes**:
- `200 OK`: Canteen found and accessible
- `403 Forbidden`: Canteen not available for student's college
- `404 Not Found`: Canteen not found or not active

### Frontend Changes

#### api.ts
Added new endpoint:
```typescript
STUDENT_SEARCH_CANTEEN: `${API_BASE_URL}/Student/canteen/search`
```

#### StudDash.tsx
Implemented complete search functionality:

1. **State Management**:
   - `searchCode`: Stores the entered canteen code
   - `searchResult`: Stores the found canteen details
   - `searchError`: Stores error messages
   - `isSearching`: Loading state during search

2. **Search Function** (`handleSearch`):
   - Validates input
   - Calls the search API with JWT token
   - Handles success and error responses
   - Displays results or error messages

3. **UI Components**:
   - Search input with icon
   - Search button with loading state
   - Error message display (red banner)
   - Search result card with:
     - Canteen name
     - Canteen code
     - Address
     - "View Menu" button
     - Close button to dismiss result

4. **Features**:
   - Enter key support for search
   - Loading state during search
   - Error handling with user-friendly messages
   - Navigation to canteen menu with canteen details

## User Flow

1. **Student enters canteen code**:
   - Types canteen code in search bar (e.g., "CANT001")
   - Presses Enter or clicks "Search" button

2. **System validates and searches**:
   - Checks if student is authenticated
   - Searches for canteen by code
   - Validates canteen is active
   - Checks if canteen belongs to student's college

3. **Results displayed**:
   - **Success**: Shows canteen card with details and "View Menu" button
   - **Error**: Shows error message (canteen not found, not active, or not available for college)

4. **View menu**:
   - Student clicks "View Menu" button
   - Navigates to canteen menu page with canteen details

## API Endpoint Details

### GET /Student/canteen/search

**Request**:
```
GET /Student/canteen/search?canteenCode=CANT001
Headers:
  Authorization: Bearer <jwt_token>
```

**Success Response (200)**:
```json
{
  "canteenId": "uuid",
  "name": "Main Campus Canteen",
  "canteenCode": "CANT001",
  "collegeCode": "CLG001",
  "address": "Building A, Ground Floor",
  "phone": "9999999999",
  "isActive": true
}
```

**Error Responses**:

**404 - Canteen Not Found**:
```json
{
  "error": "Canteen not found with code: CANT001"
}
```

**404 - Canteen Not Active**:
```json
{
  "error": "Canteen is not currently active"
}
```

**403 - Not Available for College**:
```json
{
  "error": "This canteen is not available for your college"
}
```

## Security Features

1. **Authentication Required**: All requests must include valid JWT token
2. **College Validation**: Students can only access canteens from their college
3. **Active Status Check**: Only active canteens are returned
4. **Input Validation**: Canteen code is validated before search

## Testing Scenarios

### Test Case 1: Successful Search
1. Register student with college code "CLG001"
2. Register canteen with code "CANT001" and college code "CLG001"
3. Login as student
4. Search for "CANT001"
5. **Expected**: Canteen details displayed with "View Menu" button

### Test Case 2: Canteen Not Found
1. Login as student
2. Search for non-existent code "INVALID"
3. **Expected**: Error message "Canteen not found with code: INVALID"

### Test Case 3: Wrong College
1. Register student with college code "CLG001"
2. Register canteen with code "CANT002" and college code "CLG002"
3. Login as student
4. Search for "CANT002"
5. **Expected**: Error message "This canteen is not available for your college"

### Test Case 4: Inactive Canteen
1. Register canteen with code "CANT003" and set isActive = false
2. Login as student
3. Search for "CANT003"
4. **Expected**: Error message "Canteen is not currently active"

### Test Case 5: Empty Search
1. Login as student
2. Click search without entering code
3. **Expected**: Error message "Please enter a canteen code"

## UI/UX Features

1. **Real-time Feedback**:
   - Loading state during search
   - Immediate error display
   - Clear success indication

2. **Keyboard Support**:
   - Enter key triggers search
   - Improves user experience

3. **Responsive Design**:
   - Works on all screen sizes
   - Mobile-friendly interface

4. **Clear Actions**:
   - Prominent "View Menu" button
   - Easy to dismiss search results
   - Clear error messages

## Next Steps

1. Test the search functionality with different scenarios
2. Ensure the canteen menu page can receive and display the canteen details
3. Consider adding:
   - Search history
   - Recent searches
   - Autocomplete suggestions
   - Favorite canteens

## Notes

- Search is case-sensitive for canteen codes
- Only authenticated students can search
- College code validation ensures students only see their college's canteens
- The search result can be dismissed by clicking the close button
- Clicking "View Menu" navigates to the canteen menu page with canteen details passed via route state
