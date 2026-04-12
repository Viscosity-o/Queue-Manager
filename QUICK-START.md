# Quick Start Guide

## Running the Application

### Option 1: Run with Tests (Recommended)
```bash
cd canteen
mvn clean install
mvn spring-boot:run
```

### Option 2: Skip Tests (Faster)
```bash
cd canteen
mvn spring-boot:run -DskipTests
```

### Option 3: Build JAR and Run
```bash
cd canteen
mvn clean package -DskipTests
java -jar target/canteen-0.0.1-SNAPSHOT.jar
```

---

## Common Issues & Solutions

### Issue 1: Test Failures
**Error**: `maven-surefire-plugin:test failed`

**Solution**: Tests now use H2 in-memory database. If still failing:
```bash
mvn spring-boot:run -DskipTests
```

### Issue 2: Port Already in Use
**Error**: `Port 8080 is already in use`

**Solution**: Kill the process or change port:
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Or change port in application.properties
server.port=8081
```

### Issue 3: Database Connection Failed
**Error**: `Connection refused: connect`

**Solution**: Make sure PostgreSQL is running:
```bash
# Check if PostgreSQL is running
# Windows: Services → PostgreSQL
# Or update application.properties with correct credentials
```

---

## Testing the API

### 1. Register a Canteen Staff
```bash
POST http://localhost:8080/auth/register/canteen
Content-Type: application/json

{
  "name": "Test Canteen",
  "email": "canteen@test.com",
  "password": "password123",
  "canteenCode": "CANT001",
  "address": "123 Main St",
  "phone": "9999999999"
}
```

### 2. Login
```bash
POST http://localhost:8080/auth/login
Content-Type: application/json

{
  "email": "canteen@test.com",
  "password": "password123"
}
```

**Response**: Copy the `token` from response

### 3. Get Dashboard Stats
```bash
GET http://localhost:8080/staff/dashboard/stats
Authorization: Bearer <YOUR_TOKEN>
```

### 4. Add Inventory Item
```bash
POST http://localhost:8080/staff/inventory
Authorization: Bearer <YOUR_TOKEN>
Content-Type: application/json

{
  "name": "Basmati Rice",
  "category": "Grains",
  "quantity": 50,
  "unit": "kg",
  "minStock": 20,
  "supplier": "ABC Traders"
}
```

### 5. Get All Inventory
```bash
GET http://localhost:8080/staff/inventory
Authorization: Bearer <YOUR_TOKEN>
```

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd Frontend/my-project
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Access Application
```
http://localhost:5173
```

---

## Default Credentials (After Registration)

**Canteen Staff:**
- Email: canteen@test.com
- Password: password123

**Student:**
- Email: student@test.com
- Password: password123

---

## Project Structure

```
canteen/
├── src/main/java/com/example/canteen/
│   ├── Controllers/          # REST API endpoints
│   ├── Security/             # JWT & Spring Security
│   ├── services/             # Business logic
│   ├── dao/                  # Repositories
│   ├── entity/               # Database entities
│   └── dto/                  # Data Transfer Objects
├── src/main/resources/
│   └── application.properties
└── src/test/
    ├── java/                 # Test files
    └── resources/
        └── application-test.properties

Frontend/my-project/
├── src/
│   ├── components/           # React components
│   ├── config/               # API configuration
│   └── App.tsx
└── package.json
```

---

## Useful Commands

### Maven
```bash
mvn clean                    # Clean build artifacts
mvn compile                  # Compile source code
mvn test                     # Run tests
mvn package                  # Create JAR file
mvn spring-boot:run          # Run application
mvn spring-boot:run -DskipTests  # Run without tests
```

### NPM
```bash
npm install                  # Install dependencies
npm run dev                  # Development server
npm run build                # Production build
npm run preview              # Preview production build
```

---

## Environment Variables

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/canteen_db
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_secret_key
razorpay.key.id=your_razorpay_key
razorpay.key.secret=your_razorpay_secret
```

### Frontend (.env.development)
```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## Next Steps

1. ✅ Start backend: `mvn spring-boot:run -DskipTests`
2. ✅ Start frontend: `npm run dev`
3. ✅ Register a canteen staff account
4. ✅ Login and get JWT token
5. ✅ Test staff dashboard features
6. ✅ Add inventory items
7. ✅ Add menu items
8. ✅ Test payment flow

---

## Troubleshooting

### Backend won't start
1. Check if PostgreSQL is running
2. Verify database credentials in application.properties
3. Check if port 8080 is available
4. Run with `-DskipTests` flag

### Frontend won't connect to backend
1. Check if backend is running on port 8080
2. Verify CORS settings in SecurityConfig.java
3. Check browser console for errors
4. Verify API_BASE_URL in config/api.ts

### Tests failing
1. H2 database dependency added for tests
2. Test profile configured in application-test.properties
3. Use `-DskipTests` to skip tests temporarily

---

## Support

For issues, check:
1. DEPLOYMENT-GUIDE.md - Deployment instructions
2. STAFF-DASHBOARD-BACKEND.md - API documentation
3. razorpay-integration.md - Payment integration details

Happy coding! 🚀
