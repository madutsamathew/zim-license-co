# Authentication Setup Guide

## Overview

This application now has a complete JWT-based authentication system integrated between the backend (Spring Boot) and frontend (React).

## Backend Changes

### 1. New Entities
- **User Entity** (`domain/User.java`): User table with roles (ADMIN, REGULATOR, COMPANY)
- **UserRole Enum** (`domain/UserRole.java`): Three user roles

### 2. Database Migration
- **V4__create_users_table.sql**: Creates users table with default users

### 3. JWT Implementation
- **JwtUtil** (`config/JwtUtil.java`): Generates and validates JWT tokens
- **JwtAuthenticationFilter** (`config/JwtAuthenticationFilter.java`): Intercepts requests to validate tokens
- **SecurityConfig** (`config/SecurityConfig.java`): Updated with JWT authentication

### 4. Auth Services
- **AuthService** (`service/AuthService.java`): Handles login and registration logic
- **AuthController** (`controller/AuthController.java`): REST endpoints for auth
- **CustomUserDetailsService** (`service/CustomUserDetailsService.java`): Loads user details for Spring Security

### 5. DTOs
- **LoginRequest**: Email and password
- **RegisterRequest**: Complete registration data
- **AuthResponse**: Returns JWT token and user info
- **UserDTO**: User data without password

## Frontend Changes

### 1. API Service
- **api.ts** (`src/lib/api.ts`): Axios instance with JWT interceptors

### 2. Auth Context
- **AuthContext.tsx** (`src/contexts/AuthContext.tsx`): Global authentication state management

### 3. Protected Routes
- **ProtectedRoute.tsx** (`src/components/ProtectedRoute.tsx`): Wrapper for authenticated routes

### 4. Updated Pages
- **Login.tsx**: Now connects to backend API
- **Register.tsx**: Now connects to backend API

## API Endpoints

### Authentication Endpoints

#### 1. Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "role": "COMPANY",
  "companyName": "ABC Corp",
  "phoneNumber": "+263777123456"
}

Response (201 Created):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "COMPANY",
  "userId": "uuid",
  "companyName": "ABC Corp"
}
```

#### 2. Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@zimlicense.co",
  "password": "password"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "admin@zimlicense.co",
  "fullName": "System Administrator",
  "role": "ADMIN",
  "userId": "admin-001",
  "companyName": null
}
```

#### 3. Validate Token
```bash
GET /api/auth/validate
Authorization: Bearer <token>

Response (200 OK):
{
  "status": "valid"
}
```

### Protected Endpoints

All other `/api/**` endpoints now require authentication. Include the JWT token in the Authorization header:

```bash
GET /api/licenses
Authorization: Bearer <your-jwt-token>
```

## Default Users

The system comes with two default users:

1. **Admin User**
   - Email: `admin@zimlicense.co`
   - Password: `password`
   - Role: ADMIN

2. **Regulator User**
   - Email: `regulator@zimlicense.co`
   - Password: `password`
   - Role: REGULATOR

## User Roles

- **ADMIN**: Full system access
- **REGULATOR**: Can view and manage all licenses
- **COMPANY**: Can view own licenses and apply for new ones

## How to Use

### Backend Setup

1. Make sure MySQL is running
2. The backend will automatically create the database and run migrations
3. Start the backend:
```bash
cd "zim-license-co backend"
./mvnw spring-boot:run
```

### Frontend Setup

1. Install dependencies (if not done):
```bash
npm install
```

2. Start the frontend:
```bash
npm run dev
```

3. Navigate to `http://localhost:5173`

### Testing Authentication

1. **Login with Admin**:
   - Go to `/login`
   - Email: `admin@zimlicense.co`
   - Password: `admin123`

2. **Register New Company**:
   - Go to `/register`
   - Fill in company details
   - Default role: COMPANY

3. **Access Protected Routes**:
   - After login, you can access `/dashboard`, `/companies`, `/licenses`
   - Without login, you'll be redirected to `/login`

## Security Features

1. **JWT Token Authentication**: Stateless authentication using JSON Web Tokens
2. **Password Encryption**: BCrypt hashing for passwords
3. **Token Expiration**: Tokens expire after 24 hours
4. **Protected Routes**: Frontend routes protected with ProtectedRoute component
5. **Automatic Redirect**: Expired/invalid tokens redirect to login
6. **CORS Enabled**: Allows cross-origin requests from frontend

## Token Storage

- Tokens are stored in `localStorage`
- User info stored in `localStorage` as JSON
- Automatically cleared on logout or token expiration

## Error Handling

- Invalid credentials: 401 Unauthorized
- Expired token: Automatic redirect to login
- Registration errors: Displayed in toast notifications
- Network errors: Handled by axios interceptors

## Next Steps

1. **Role-Based Access Control**: Implement different UI based on user roles
2. **Password Reset**: Add forgot password functionality
3. **Email Verification**: Add email confirmation on registration
4. **Refresh Tokens**: Implement token refresh mechanism
5. **User Profile**: Add profile management pages
6. **Audit Logs**: Track user actions

## Troubleshooting

### Backend Issues

1. **Database Connection Error**:
   - Check MySQL is running
   - Verify credentials in `application.properties`

2. **JWT Token Error**:
   - Check `jwt.secret` is configured
   - Ensure it's at least 256 bits (32 characters)

3. **CORS Error**:
   - Verify `CorsConfig.java` allows frontend origin
   - Check browser console for specific CORS errors

### Frontend Issues

1. **Cannot Connect to Backend**:
   - Verify backend is running on port 8080
   - Check API_BASE_URL in `api.ts`

2. **Token Not Working**:
   - Clear localStorage
   - Login again to get new token

3. **Redirect Loop**:
   - Clear browser cache and localStorage
   - Check ProtectedRoute logic

## Architecture Diagram

```
Frontend (React)
    ↓
API Service (axios)
    ↓ [JWT Token in Header]
Backend (Spring Boot)
    ↓
JwtAuthenticationFilter
    ↓ [Validates Token]
SecurityFilterChain
    ↓
Controllers (Protected)
    ↓
Services
    ↓
Repositories
    ↓
Database (MySQL)
```

## Files Modified/Created

### Backend
- ✅ `pom.xml` - Added JWT dependencies
- ✅ `User.java` - User entity
- ✅ `UserRole.java` - Enum for roles
- ✅ `V4__create_users_table.sql` - Database migration
- ✅ `JwtUtil.java` - JWT utilities
- ✅ `JwtAuthenticationFilter.java` - JWT filter
- ✅ `SecurityConfig.java` - Updated security config
- ✅ `CustomUserDetailsService.java` - User details service
- ✅ `UserRepository.java` - User repository
- ✅ `AuthService.java` - Authentication service
- ✅ `AuthController.java` - Auth endpoints
- ✅ `LoginRequest.java`, `RegisterRequest.java`, `AuthResponse.java`, `UserDTO.java` - DTOs
- ✅ `UserMapper.java` - User mapper
- ✅ `application.properties` - Added JWT config

### Frontend
- ✅ `api.ts` - API service with interceptors
- ✅ `AuthContext.tsx` - Auth state management
- ✅ `ProtectedRoute.tsx` - Route protection
- ✅ `App.tsx` - Added AuthProvider and protected routes
- ✅ `Login.tsx` - Updated to use backend
- ✅ `Register.tsx` - Updated to use backend

## Support

For issues or questions, please check:
1. Backend logs: `backend.log`
2. Browser console for frontend errors
3. Network tab for API call debugging

