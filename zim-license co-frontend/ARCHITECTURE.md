# System Architecture

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌──────────────┐         │
│  │   Login    │  │  Register  │  │  Dashboard   │         │
│  │    Page    │  │    Page    │  │  (Protected) │         │
│  └────────────┘  └────────────┘  └──────────────┘         │
│         │              │                  │                 │
│         └──────────────┴──────────────────┘                │
│                        │                                    │
│                   AuthContext                               │
│                        │                                    │
│                    API Service                              │
│                  (Axios + JWT)                              │
└────────────────────────┼────────────────────────────────────┘
                         │
                         │ HTTP/JSON + JWT Token
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   BACKEND (Spring Boot)                      │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              JwtAuthenticationFilter                   │ │
│  │           (Validates JWT on each request)             │ │
│  └───────────────────────┬───────────────────────────────┘ │
│                          │                                  │
│  ┌───────────────────────▼───────────────────────────────┐ │
│  │              SecurityFilterChain                       │ │
│  │         (Authorizes access to endpoints)              │ │
│  └───────────────────────┬───────────────────────────────┘ │
│                          │                                  │
│       ┌──────────────────┼──────────────────┐              │
│       │                  │                  │              │
│  ┌────▼─────┐  ┌────────▼────────┐  ┌─────▼──────┐       │
│  │  Auth    │  │    License      │  │  Company   │       │
│  │Controller│  │   Controller    │  │ Controller │       │
│  └────┬─────┘  └────────┬────────┘  └─────┬──────┘       │
│       │                 │                  │              │
│  ┌────▼─────┐  ┌────────▼────────┐  ┌─────▼──────┐       │
│  │  Auth    │  │    License      │  │  Company   │       │
│  │ Service  │  │    Service      │  │  Service   │       │
│  └────┬─────┘  └────────┬────────┘  └─────┬──────┘       │
│       │                 │                  │              │
│  ┌────▼─────┐  ┌────────▼────────┐  ┌─────▼──────┐       │
│  │   User   │  │    License      │  │  Company   │       │
│  │Repository│  │   Repository    │  │ Repository │       │
│  └────┬─────┘  └────────┬────────┘  └─────┬──────┘       │
│       │                 │                  │              │
└───────┼─────────────────┼──────────────────┼──────────────┘
        │                 │                  │
        └─────────────────┴──────────────────┘
                          │
                          │
                 ┌────────▼─────────┐
                 │  MySQL Database  │
                 │                  │
                 │  ┌────────────┐ │
                 │  │   users    │ │
                 │  ├────────────┤ │
                 │  │  licenses  │ │
                 │  ├────────────┤ │
                 │  │ companies  │ │
                 │  └────────────┘ │
                 └──────────────────┘
```

## 🔐 Authentication Flow

```
┌──────┐                ┌──────────┐              ┌─────────┐
│Client│                │ Backend  │              │Database │
└──┬───┘                └────┬─────┘              └────┬────┘
   │                         │                         │
   │  1. POST /auth/login    │                         │
   │  { email, password }    │                         │
   ├────────────────────────>│                         │
   │                         │                         │
   │                         │  2. Query user          │
   │                         ├────────────────────────>│
   │                         │                         │
   │                         │  3. User data           │
   │                         │<────────────────────────┤
   │                         │                         │
   │                         │  4. Verify password     │
   │                         │     (BCrypt)            │
   │                         │                         │
   │                         │  5. Generate JWT        │
   │                         │     (JwtUtil)           │
   │                         │                         │
   │  6. AuthResponse        │                         │
   │  { token, user data }   │                         │
   │<────────────────────────┤                         │
   │                         │                         │
   │  7. Store token in      │                         │
   │     localStorage        │                         │
   │                         │                         │
```

## 🔒 Protected Request Flow

```
┌──────┐                ┌──────────┐              ┌─────────┐
│Client│                │ Backend  │              │Database │
└──┬───┘                └────┬─────┘              └────┬────┘
   │                         │                         │
   │  1. GET /licenses       │                         │
   │  Authorization: Bearer  │                         │
   │  <JWT_TOKEN>            │                         │
   ├────────────────────────>│                         │
   │                         │                         │
   │                         │  2. JwtAuthFilter       │
   │                         │     validates token     │
   │                         │                         │
   │                         │  3. SecurityFilterChain │
   │                         │     checks permission   │
   │                         │                         │
   │                         │  4. Query licenses      │
   │                         ├────────────────────────>│
   │                         │                         │
   │                         │  5. License data        │
   │                         │<────────────────────────┤
   │                         │                         │
   │  6. JSON Response       │                         │
   │  [licenses...]          │                         │
   │<────────────────────────┤                         │
   │                         │                         │
```

## 📦 Component Layers

### Frontend (React)

```
┌───────────────────────────────────────────┐
│            Presentation Layer             │
│  (Pages: Login, Register, Dashboard)      │
└─────────────────┬─────────────────────────┘
                  │
┌─────────────────▼─────────────────────────┐
│          State Management Layer           │
│         (AuthContext, useState)           │
└─────────────────┬─────────────────────────┘
                  │
┌─────────────────▼─────────────────────────┐
│           Service Layer                   │
│  (licenseService, companyService)         │
└─────────────────┬─────────────────────────┘
                  │
┌─────────────────▼─────────────────────────┐
│           HTTP Client Layer               │
│         (Axios with JWT interceptors)     │
└───────────────────────────────────────────┘
```

### Backend (Spring Boot)

```
┌───────────────────────────────────────────┐
│            Controller Layer               │
│    (REST endpoints, request mapping)      │
└─────────────────┬─────────────────────────┘
                  │
┌─────────────────▼─────────────────────────┐
│            Service Layer                  │
│    (Business logic, validations)          │
└─────────────────┬─────────────────────────┘
                  │
┌─────────────────▼─────────────────────────┐
│          Repository Layer                 │
│    (JPA repositories, database queries)   │
└─────────────────┬─────────────────────────┘
                  │
┌─────────────────▼─────────────────────────┐
│            Data Layer                     │
│    (MySQL database, Flyway migrations)    │
└───────────────────────────────────────────┘
```

## 🔄 Data Flow Examples

### User Registration

```
User Input → Register Form → AuthContext.register()
    ↓
API Service (POST /auth/register)
    ↓
AuthController.register() → AuthService.register()
    ↓
Password encryption (BCrypt) → UserRepository.save()
    ↓
MySQL Database (INSERT INTO users)
    ↓
Generate JWT Token → Return AuthResponse
    ↓
Store token in localStorage → Redirect to Dashboard
```

### Fetching Licenses

```
Dashboard Page → useEffect() → licenseService.getAllLicenses()
    ↓
Axios interceptor adds JWT token
    ↓
GET /api/licenses (with Authorization header)
    ↓
JwtAuthenticationFilter validates token
    ↓
SecurityFilterChain authorizes request
    ↓
LicenseController.getAllLicenses() → LicenseService.getAllLicenses()
    ↓
LicenseRepository.findAll()
    ↓
MySQL Database (SELECT * FROM licenses)
    ↓
Map entities to DTOs → Return JSON
    ↓
Display licenses in UI
```

## 🛡️ Security Layers

```
┌─────────────────────────────────────────────┐
│         1. CORS Protection                  │
│    (Cross-Origin Resource Sharing)          │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         2. JWT Authentication               │
│    (Token validation on each request)       │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         3. Role-Based Authorization         │
│    (Check user permissions)                 │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         4. Input Validation                 │
│    (Validate request bodies)                │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         5. Exception Handling               │
│    (Global error handler)                   │
└─────────────────────────────────────────────┘
```

## 📊 Database Schema

```
┌─────────────────────────────────────────┐
│              users                      │
├─────────────────────────────────────────┤
│ id                VARCHAR(255) PK       │
│ email             VARCHAR(255) UNIQUE   │
│ password          VARCHAR(255)          │
│ full_name         VARCHAR(255)          │
│ role              VARCHAR(50)           │
│ company_name      VARCHAR(255)          │
│ phone_number      VARCHAR(50)           │
│ is_active         BOOLEAN               │
│ created_at        TIMESTAMP             │
│ updated_at        TIMESTAMP             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│            licenses                     │
├─────────────────────────────────────────┤
│ id                VARCHAR(255) PK       │
│ company_name      VARCHAR(255)          │
│ license_type      VARCHAR(50)           │
│ issue_date        DATE                  │
│ latitude          DOUBLE                │
│ longitude         DOUBLE                │
│ email             VARCHAR(255)          │
│ application_fee   DECIMAL(15,2)         │
│ license_fee       DECIMAL(15,2)         │
│ validity_years    INT                   │
│ created_at        TIMESTAMP             │
│ updated_at        TIMESTAMP             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│            companies                    │
├─────────────────────────────────────────┤
│ id                VARCHAR(255) PK       │
│ name              VARCHAR(255) UNIQUE   │
│ latitude          DOUBLE                │
│ longitude         DOUBLE                │
│ email             VARCHAR(255)          │
│ contact_person    VARCHAR(255)          │
│ address           VARCHAR(500)          │
│ created_at        TIMESTAMP             │
│ updated_at        TIMESTAMP             │
└─────────────────────────────────────────┘
```

## 🔑 JWT Token Structure

```
Header
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload
{
  "sub": "user@example.com",
  "role": "ADMIN",
  "userId": "uuid-here",
  "iat": 1696425600,
  "exp": 1696512000
}

Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

## 🎯 Key Design Patterns

### Frontend
- **Context API**: Global state management (AuthContext)
- **Service Layer**: Separation of API calls (licenseService, companyService)
- **Higher-Order Components**: Route protection (ProtectedRoute)
- **Interceptor Pattern**: Automatic token injection (Axios interceptors)

### Backend
- **Dependency Injection**: Spring's @Autowired
- **Repository Pattern**: JPA repositories
- **DTO Pattern**: Separate DTOs from entities
- **Filter Chain**: JWT authentication filter
- **Exception Handling**: Global exception handler

## 📈 Scalability Considerations

### Current Implementation
- Stateless authentication (JWT)
- Database connection pooling (HikariCP)
- RESTful API design
- Modular component structure

### Future Enhancements
- Redis for token blacklisting
- Refresh token mechanism
- Load balancing
- API rate limiting
- Caching layer (Redis/Memcached)
- Microservices architecture
- Message queue (RabbitMQ/Kafka)

## 🔍 Monitoring Points

- API response times
- Authentication success/failure rates
- Token expiration events
- Database query performance
- Error rates and types
- Active user sessions
- API endpoint usage

## 🚀 Deployment Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Nginx     │────>│  Frontend   │     │  Backend    │
│ (Reverse    │     │  (React)    │────>│ (Spring     │
│   Proxy)    │     │  Port 5173  │     │  Boot)      │
└─────────────┘     └─────────────┘     │  Port 8080  │
                                         └──────┬──────┘
                                                │
                                         ┌──────▼──────┐
                                         │   MySQL     │
                                         │  Database   │
                                         └─────────────┘
```

This architecture provides a solid foundation for a secure, scalable telecommunications license management system!

