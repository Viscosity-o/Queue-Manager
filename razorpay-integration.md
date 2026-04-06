# Razorpay Payment Integration Documentation

## Overview
This document outlines all the files created and modified to integrate Razorpay payment gateway into The Culinary Editorial canteen management system.

---

## Backend Changes (Spring Boot)

### 1. **Dependency Added**
**File:** `canteen/pom.xml`

**Changes:**
- Added Razorpay Java SDK dependency (version 1.4.6)

```xml
<dependency>
    <groupId>com.razorpay</groupId>
    <artifactId>razorpay-java</artifactId>
    <version>1.4.6</version>
</dependency>
```

---

### 2. **Configuration Properties**
**File:** `canteen/src/main/resources/application.properties`

**Changes:**
- Added Razorpay API credentials configuration

```properties
# Razorpay
razorpay.key.id=rzp_test_your_key_id
razorpay.key.secret=your_secret_key
```

---

### 3. **New Entity Created**
**File:** `canteen/src/main/java/com/example/canteen/entity/Order.java`

**Purpose:** Store order details and payment information

**Key Fields:**
- `orderId` (UUID) - Primary key
- `studentId` (UUID) - Reference to student
- `canteenId` (UUID) - Reference to canteen
- `razorpayOrderId` (String) - Razorpay order ID
- `razorpayPaymentId` (String) - Razorpay payment ID
- `razorpaySignature` (String) - Payment signature for verification
- `amount` (Double) - Order amount
- `currency` (String) - Currency code (INR)
- `status` (OrderStatus enum) - Order status (CREATED, PENDING, PAID, FAILED, CANCELLED)
- `paymentMethod` (String) - Payment method used
- `items` (String) - JSON string of order items
- `createdAt` (LocalDateTime) - Order creation timestamp
- `updatedAt` (LocalDateTime) - Last update timestamp

---

### 4. **New DTOs Created**

#### **File:** `canteen/src/main/java/com/example/canteen/dto/OrderRequest.java`

**Purpose:** Request payload for creating orders

**Fields:**
- `studentId` (UUID)
- `canteenId` (UUID)
- `amount` (Double)
- `currency` (String)
- `items` (List<OrderItem>)

**Inner Class - OrderItem:**
- `itemId` (Long)
- `name` (String)
- `quantity` (Integer)
- `price` (Double)

#### **File:** `canteen/src/main/java/com/example/canteen/dto/PaymentVerificationRequest.java`

**Purpose:** Request payload for payment verification

**Fields:**
- `razorpayOrderId` (String)
- `razorpayPaymentId` (String)
- `razorpaySignature` (String)

---

### 5. **New Repository Created**
**File:** `canteen/src/main/java/com/example/canteen/dao/Orderrepo.java`

**Purpose:** Database operations for Order entity

**Methods:**
- `findByRazorpayOrderId(String razorpayOrderId)` - Find order by Razorpay order ID

---

### 6. **New Service Interface**
**File:** `canteen/src/main/java/com/example/canteen/services/PaymentService.java`

**Purpose:** Define payment service contract

**Methods:**
- `createRazorpayOrder(OrderRequest orderRequest)` - Create Razorpay order
- `verifyPaymentSignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature)` - Verify payment signature
- `updateOrderAfterPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature)` - Update order after successful payment

---

### 7. **New Service Implementation**
**File:** `canteen/src/main/java/com/example/canteen/services/PaymentServiceImpl.java`

**Purpose:** Implement payment service logic

**Key Functionality:**
- **createRazorpayOrder():**
  - Initializes Razorpay client with API credentials
  - Creates order on Razorpay with amount in paise (amount * 100)
  - Saves order to database with CREATED status
  - Returns Razorpay order JSON

- **verifyPaymentSignature():**
  - Creates payload: `razorpayOrderId|razorpayPaymentId`
  - Generates HMAC SHA256 signature using secret key
  - Compares generated signature with received signature
  - Returns true if signatures match

- **updateOrderAfterPayment():**
  - Fetches order from database using Razorpay order ID
  - Verifies payment signature
  - Updates order with payment ID, signature, and PAID status
  - Returns updated order or throws exception if verification fails

---

### 8. **New Controller Created**
**File:** `canteen/src/main/java/com/example/canteen/Controllers/PaymentController.java`

**Purpose:** REST API endpoints for payment operations

**Endpoints:**

#### **POST /api/payment/create-order**
- **Request Body:** OrderRequest
- **Response:** 
  ```json
  {
    "orderId": "order_xxx",
    "amount": 10000,
    "currency": "INR",
    "keyId": "rzp_test_xxx"
  }
  ```
- **Purpose:** Create Razorpay order and return order details

#### **POST /api/payment/verify**
- **Request Body:** PaymentVerificationRequest
- **Response:**
  ```json
  {
    "success": true,
    "message": "Payment verified successfully",
    "orderId": "uuid",
    "status": "PAID"
  }
  ```
- **Purpose:** Verify payment signature and update order status

#### **GET /api/payment/key**
- **Response:**
  ```json
  {
    "keyId": "rzp_test_xxx"
  }
  ```
- **Purpose:** Get Razorpay public key for frontend

---

### 9. **Security Configuration Updated**
**File:** `canteen/src/main/java/com/example/canteen/Security/SecurityConfig.java`

**Changes:**
- Added `/api/payment/**` to permitAll() endpoints
- Allows unauthenticated access to payment endpoints

```java
.requestMatchers("/auth/**", "/api/payment/**").permitAll()
```

---

## Frontend Changes (React + TypeScript)

### 1. **Checkout Component Updated**
**File:** `Frontend/my-project/src/components/Checkout.tsx`

**Major Changes:**

#### **New Imports:**
```typescript
import { useState, useEffect } from 'react';
```

#### **New State Variables:**
```typescript
const [loading, setLoading] = useState(false);
const [razorpayKeyId, setRazorpayKeyId] = useState('');
```

#### **New Type Declaration:**
```typescript
declare global {
  interface Window {
    Razorpay: any;
  }
}
```

#### **useEffect Hook Added:**
- Dynamically loads Razorpay checkout script
- Fetches Razorpay key from backend
- Cleanup function removes script on unmount

```typescript
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);

  fetch('http://localhost:8080/api/payment/key')
    .then(res => res.json())
    .then(data => setRazorpayKeyId(data.keyId))
    .catch(err => console.error('Failed to fetch Razorpay key:', err));

  return () => {
    document.body.removeChild(script);
  };
}, []);
```

#### **New Function: initiateRazorpayPayment()**
**Purpose:** Handle Razorpay payment flow

**Steps:**
1. Create order on backend via `/api/payment/create-order`
2. Initialize Razorpay with order details
3. Open Razorpay payment interface
4. Handle payment success callback
5. Verify payment on backend via `/api/payment/verify`
6. Show success/failure message

**Razorpay Options:**
```typescript
const options = {
  key: razorpayKeyId,
  amount: orderData.amount,
  currency: orderData.currency,
  name: 'The Culinary Editorial',
  description: 'Order Payment',
  order_id: orderData.orderId,
  handler: async function (response: any) {
    // Verify payment on backend
  },
  prefill: {
    name: 'Student Name',
    email: 'student@example.com',
    contact: '9999999999',
  },
  theme: {
    color: '#173628',
  },
  modal: {
    ondismiss: function () {
      setLoading(false);
      alert('Payment cancelled');
    },
  },
};
```

#### **Updated handleCompleteOrder() Function:**
- Checks payment method
- Calls `initiateRazorpayPayment()` for UPI/Card
- Shows alert for Cash on Pickup

#### **Updated Complete Order Button:**
- Added `disabled` state when loading
- Shows "Processing..." text during payment
- Conditionally renders arrow icon

```typescript
<button
  onClick={handleCompleteOrder}
  disabled={loading}
  className="... disabled:opacity-50 disabled:cursor-not-allowed"
>
  <span>{loading ? 'Processing...' : 'Complete Order & Pay'}</span>
  {!loading && (
    <span className="material-symbols-outlined">arrow_forward</span>
  )}
</button>
```

---

## Payment Flow Diagram

```
Frontend (Checkout.tsx)
    |
    | 1. User clicks "Complete Order & Pay"
    |
    v
Backend (POST /api/payment/create-order)
    |
    | 2. Create Razorpay order
    | 3. Save order to database (status: CREATED)
    |
    v
Frontend receives order details
    |
    | 4. Initialize Razorpay with order_id
    | 5. Open Razorpay payment interface
    |
    v
User completes payment on Razorpay
    |
    | 6. Razorpay returns payment details
    |
    v
Frontend (handler callback)
    |
    | 7. Send payment details to backend
    |
    v
Backend (POST /api/payment/verify)
    |
    | 8. Verify payment signature
    | 9. Update order status to PAID
    |
    v
Frontend receives verification response
    |
    | 10. Show success message
    | 11. Navigate to dashboard
```

---

## Database Schema

### **orders Table**

| Column | Type | Constraints |
|--------|------|-------------|
| order_id | UUID | PRIMARY KEY |
| student_id | UUID | NOT NULL |
| canteen_id | UUID | NOT NULL |
| razorpay_order_id | VARCHAR | UNIQUE |
| razorpay_payment_id | VARCHAR | |
| razorpay_signature | VARCHAR | |
| amount | DOUBLE | NOT NULL |
| currency | VARCHAR | NOT NULL |
| status | VARCHAR | NOT NULL (ENUM) |
| payment_method | VARCHAR | |
| items | TEXT | |
| created_at | TIMESTAMP | NOT NULL |
| updated_at | TIMESTAMP | |

---

## API Endpoints Summary

| Method | Endpoint | Auth Required | Purpose |
|--------|----------|---------------|---------|
| POST | `/api/payment/create-order` | No | Create Razorpay order |
| POST | `/api/payment/verify` | No | Verify payment signature |
| GET | `/api/payment/key` | No | Get Razorpay public key |

---

## Testing Credentials

### **Razorpay Test Mode**

**UPI:**
- UPI ID: `success@razorpay` (Success)
- UPI ID: `failure@razorpay` (Failure)

**Card:**
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date (e.g., `12/25`)
- CVV: Any 3 digits (e.g., `123`)
- Name: Any name

**Netbanking:**
- Select any bank
- Use "success" as credentials for successful payment

---

## Security Features

1. **Payment Signature Verification:**
   - HMAC SHA256 signature verification
   - Prevents payment tampering

2. **CORS Configuration:**
   - Restricted to `http://localhost:5173`
   - Prevents unauthorized access

3. **Order Status Tracking:**
   - CREATED → PENDING → PAID/FAILED
   - Audit trail for all transactions

4. **Secure Key Storage:**
   - API keys stored in application.properties
   - Secret key never exposed to frontend

---

## Files Summary

### **Backend Files Created:**
1. `canteen/src/main/java/com/example/canteen/entity/Order.java`
2. `canteen/src/main/java/com/example/canteen/dto/OrderRequest.java`
3. `canteen/src/main/java/com/example/canteen/dto/PaymentVerificationRequest.java`
4. `canteen/src/main/java/com/example/canteen/dao/Orderrepo.java`
5. `canteen/src/main/java/com/example/canteen/services/PaymentService.java`
6. `canteen/src/main/java/com/example/canteen/services/PaymentServiceImpl.java`
7. `canteen/src/main/java/com/example/canteen/Controllers/PaymentController.java`

### **Backend Files Modified:**
1. `canteen/pom.xml` - Added Razorpay dependency
2. `canteen/src/main/resources/application.properties` - Added Razorpay credentials
3. `canteen/src/main/java/com/example/canteen/Security/SecurityConfig.java` - Added payment endpoints to permitAll

### **Frontend Files Modified:**
1. `Frontend/my-project/src/components/Checkout.tsx` - Complete Razorpay integration

---

## Setup Instructions

1. **Get Razorpay Credentials:**
   - Sign up at https://razorpay.com
   - Navigate to Settings → API Keys
   - Copy Test Key ID and Secret

2. **Update Configuration:**
   - Paste keys in `application.properties`

3. **Install Dependencies:**
   ```bash
   cd canteen
   mvn clean install
   ```

4. **Run Backend:**
   ```bash
   mvn spring-boot:run
   ```

5. **Run Frontend:**
   ```bash
   cd Frontend/my-project
   npm run dev
   ```

6. **Test Payment:**
   - Navigate to checkout page
   - Select UPI payment
   - Use test credentials

---

## Troubleshooting

**Issue:** Razorpay script not loading
- **Solution:** Check browser console for CORS errors, ensure script URL is correct

**Issue:** Payment verification fails
- **Solution:** Verify Razorpay secret key is correct in application.properties

**Issue:** Order not saved to database
- **Solution:** Check PostgreSQL connection, ensure orders table exists

**Issue:** 403 Forbidden on payment endpoints
- **Solution:** Verify SecurityConfig has `/api/payment/**` in permitAll()

---

## Future Enhancements

1. Add webhook support for payment status updates
2. Implement refund functionality
3. Add payment history page for students
4. Support multiple payment methods (Wallets, EMI)
5. Add order cancellation feature
6. Implement real-time order status updates

---

**Document Version:** 1.0  
**Last Updated:** 2026-04-07  
**Author:** Kiro AI Assistant
