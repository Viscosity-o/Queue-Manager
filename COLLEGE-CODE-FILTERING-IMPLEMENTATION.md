# College Code Filtering Implementation

## Overview
This feature filters canteens displayed to students based on their college code. Students will only see canteens that belong to their college, and canteens can be searched by their canteen code.

## Changes Made

### Backend Changes

#### 1. Entity Updates
- **studentable.java**: Added `collegeCode` field
- **Canteen.java**: Added `collegeCode` field

#### 2. DTO Updates
- **RegisterStudentRequest.java**: Added `collegeCode` field
- **RegisterCanteenRequest.java**: Added `collegeCode` field
- **CanteenResponse.java**: New DTO created for canteen data

#### 3. Repository Updates
- **Canteenrepo.java**: 
  - Added `findByCollegeCode(String collegeCode)` method
  - Added `findByCanteenCode(String canteenCode)` method

#### 4. Controller Updates
- **StudentController.java**: 
  - Added `/Student/canteens` endpoint
  - Filters canteens by student's college code
  - Returns only active canteens
  - Falls back to all canteens if student has no college code

- **AuthController.java**:
  - Updated student registration to save `collegeCode`
  - Updated canteen registration to save `collegeCode`

### Frontend Changes

#### 1. API Configuration
- **api.ts**: Added `STUDENT_CANTEENS` endpoint

#### 2. Registration Form
- **Register.tsx**:
  - Added `collegeCode` field to form state
  - Added College Code input for students (after College Name)
  - Added College Code input for staff (before Canteen Code)
  - Updated payload to include `collegeCode` for both roles

## How It Works

### Registration Flow
1. **Student Registration**:
   - Student enters: name, email, password, phone, college name, **college code**
   - Backend saves student with college code

2. **Staff Registration**:
   - Staff enters: name, email, password, phone, **college code**, canteen code, address
   - Backend saves canteen with college code

### Canteen Filtering Flow
1. Student logs in and navigates to menu/canteen selection
2. Frontend calls `/Student/canteens` with JWT token
3. Backend:
   - Extracts student email from JWT
   - Fetches student record and gets their college code
   - Queries canteens with matching college code
   - Filters for active canteens only
   - Returns list of canteens
4. Frontend displays only matching canteens

## Database Migration Required

You'll need to add the `college_code` column to both tables:

```sql
-- Add college_code to students table
ALTER TABLE students ADD COLUMN college_code VARCHAR(10);

-- Add college_code to canteens table
ALTER TABLE canteens ADD COLUMN college_code VARCHAR(10);
```

## API Endpoints

### GET /Student/canteens
- **Authentication**: Required (JWT)
- **Description**: Returns canteens filtered by student's college code
- **Response**: Array of CanteenResponse objects
- **Example Response**:
```json
[
  {
    "canteenId": "uuid",
    "name": "Main Campus Canteen",
    "canteenCode": "CANT001",
    "collegeCode": "CLG001",
    "address": "Building A, Ground Floor",
    "phone": "9999999999",
    "isActive": true
  }
]
```

## Testing

### Test Scenarios

1. **Student with College Code**:
   - Register student with college code "CLG001"
   - Register canteen with college code "CLG001"
   - Login as student
   - Call `/Student/canteens`
   - Verify only canteens with "CLG001" are returned

2. **Student without College Code**:
   - Register student without college code (existing users)
   - Call `/Student/canteens`
   - Verify all active canteens are returned

3. **Multiple Colleges**:
   - Register students with different college codes
   - Register canteens with different college codes
   - Verify each student only sees their college's canteens

4. **Inactive Canteens**:
   - Set a canteen's `isActive` to false
   - Verify it doesn't appear in results

## Next Steps

1. Run database migrations to add `college_code` columns
2. Test registration flow for both students and staff
3. Test canteen filtering in student dashboard
4. Update existing users in database with college codes if needed
5. Integrate the `/Student/canteens` endpoint in the Menu component to fetch and display filtered canteens

## Notes

- College codes should be standardized across your institution
- Consider adding validation to ensure college codes match a predefined list
- The system gracefully handles students without college codes by showing all canteens
- Only active canteens are displayed to students
