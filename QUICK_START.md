# Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Java 25+
- MySQL 8.0+
- Node.js 16+
- npm or bun

### 1. Start the Backend

```bash
# Navigate to backend directory
cd "zim-license-co backend"

# Start the application (this will also start MySQL if using Docker)
./mvnw spring-boot:run
```

The backend will be available at `http://localhost:8080`

### 2. Start the Frontend

```bash
# From the project root
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` (or another port if 5173 is occupied)

## 🔐 Default Login Credentials

### Admin Account
- **Email**: `admin@zimlicense.co`
- **Password**: `password`
- **Role**: ADMIN

### Regulator Account
- **Email**: `regulator@zimlicense.co`
- **Password**: `password`
- **Role**: REGULATOR

## 📝 Testing the System

### 1. Test Login
1. Go to `http://localhost:5173/login` (check your terminal for the actual port Vite is using)
2. Use admin credentials above
3. You should be redirected to `/dashboard`

### 2. Test Registration
1. Go to `http://localhost:5173/register`
2. Fill in company details
3. You'll automatically be logged in as a COMPANY user

### 3. Test Protected Routes
1. Try accessing `/dashboard` without logging in
2. You should be redirected to `/login`
3. After login, you can access all protected routes

### 4. Test API Calls

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@zimlicense.co",
    "password": "password"
  }'
```

#### Get Licenses (with token)
```bash
curl http://localhost:8080/api/licenses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 🔧 Configuration

### Backend Configuration
Edit `zim-license-co backend/src/main/resources/application.properties`:
- Database credentials
- JWT secret (for production, use a secure random string)
- JWT expiration time

### Frontend Configuration
Edit `src/lib/api.ts`:
- API base URL (currently `http://localhost:8080/api`)

## 📁 Project Structure

```
zim-license-co-frontend/
├── src/
│   ├── components/         # React components
│   │   └── ProtectedRoute.tsx
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/              # Utilities
│   │   └── api.ts        # Axios instance with JWT
│   ├── pages/            # Page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Companies.tsx
│   │   └── Licenses.tsx
│   └── services/         # API service layer
│       ├── licenseService.ts
│       └── companyService.ts
│
zim-license-co backend/
├── src/main/java/com/zim_license_co/zim_license_co/
│   ├── config/           # Configuration classes
│   │   ├── JwtUtil.java
│   │   ├── JwtAuthenticationFilter.java
│   │   └── SecurityConfig.java
│   ├── controller/       # REST controllers
│   │   └── AuthController.java
│   ├── domain/          # Entities
│   │   ├── User.java
│   │   └── UserRole.java
│   ├── dto/             # Data Transfer Objects
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   └── AuthResponse.java
│   ├── repository/      # JPA repositories
│   │   └── UserRepository.java
│   └── service/         # Business logic
│       ├── AuthService.java
│       └── CustomUserDetailsService.java
└── src/main/resources/
    ├── application.properties
    └── db/migration/
        └── V4__create_users_table.sql
```

## 🌐 API Endpoints

### Public Endpoints (No Authentication Required)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/health` - Health check

### Protected Endpoints (Authentication Required)
- `GET /api/licenses` - Get all licenses
- `POST /api/licenses` - Create license
- `PUT /api/licenses/{id}` - Update license
- `DELETE /api/licenses/{id}` - Delete license
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create company
- `PUT /api/companies/{id}` - Update company
- `DELETE /api/companies/{id}` - Delete company

## 🎯 Key Features

✅ **JWT Authentication**: Secure token-based authentication
✅ **Role-Based Access**: ADMIN, REGULATOR, COMPANY roles
✅ **Protected Routes**: Frontend route protection
✅ **Auto Token Refresh**: Axios interceptors handle tokens
✅ **Session Persistence**: Tokens stored in localStorage
✅ **Password Encryption**: BCrypt hashing
✅ **CORS Enabled**: Cross-origin requests supported

## 🐛 Troubleshooting

### Backend not starting
- Check MySQL is running
- Verify database credentials in `application.properties`
- Check port 8080 is available

### Frontend can't connect to backend
- Verify backend is running on port 8080
- Check CORS configuration
- Check browser console for errors

### Authentication not working
- Clear localStorage: `localStorage.clear()`
- Clear browser cache
- Check JWT token in browser DevTools → Application → Local Storage

### Database migration errors
- Drop and recreate database:
  ```sql
  DROP DATABASE telecom_backend;
  CREATE DATABASE telecom_backend;
  ```
- Restart backend

## 📚 Additional Resources

- [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md) - Detailed authentication documentation
- [API_DOCUMENTATION.md](./zim-license-co%20backend/API_DOCUMENTATION.md) - Complete API reference

## 🎉 You're Ready!

You now have a fully functional authentication system integrated with your license management application. Happy coding!

