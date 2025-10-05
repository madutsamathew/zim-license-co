# ZIM License Co - API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
Currently, all endpoints are publicly accessible (no authentication required).

---

## Licenses API

### 1. Get All Licenses
Retrieve all licenses with optional filtering.

**Endpoint:** `GET /api/licenses`

**Query Parameters:**
- `type` (optional): Filter by license type (`CTL` or `PRSL`)
- `companyName` (optional): Search by company name (case-insensitive)

**Example Requests:**
```bash
# Get all licenses
curl http://localhost:8080/api/licenses

# Get CTL licenses only
curl http://localhost:8080/api/licenses?type=CTL

# Search by company name
curl http://localhost:8080/api/licenses?companyName=Global
```

**Response:** `200 OK`
```json
[
  {
    "id": "lic-001",
    "companyName": "Global Connect Inc.",
    "licenseType": "CTL",
    "issueDate": "2010-05-20",
    "gpsCoordinates": {
      "lat": -17.8252,
      "lng": 31.0335
    },
    "email": "contact@globalconnect.com",
    "applicationFeePaid": 800.0,
    "licenseFeePaid": 100000000.0,
    "validityPeriodYears": 15
  }
]
```

---

### 2. Get License by ID
Retrieve a specific license by its ID.

**Endpoint:** `GET /api/licenses/{id}`

**Example Request:**
```bash
curl http://localhost:8080/api/licenses/lic-001
```

**Response:** `200 OK`
```json
{
  "id": "lic-001",
  "companyName": "Global Connect Inc.",
  "licenseType": "CTL",
  "issueDate": "2010-05-20",
  "gpsCoordinates": {
    "lat": -17.8252,
    "lng": 31.0335
  },
  "email": "contact@globalconnect.com",
  "applicationFeePaid": 800.0,
  "licenseFeePaid": 100000000.0,
  "validityPeriodYears": 15
}
```

**Error Response:** `400 Bad Request`
```json
{
  "status": 400,
  "message": "License not found with id: invalid-id",
  "timestamp": "2025-10-04T10:30:00"
}
```

---

### 3. Create License
Create a new license.

**Endpoint:** `POST /api/licenses`

**Request Body:**
```json
{
  "companyName": "New Tech Solutions",
  "licenseType": "CTL",
  "issueDate": "2024-01-15",
  "gpsCoordinates": {
    "lat": -17.8252,
    "lng": 31.0335
  },
  "email": "contact@newtech.com",
  "applicationFeePaid": 800,
  "licenseFeePaid": 100000000,
  "validityPeriodYears": 15
}
```

**Example Request:**
```bash
curl -X POST http://localhost:8080/api/licenses \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "New Tech Solutions",
    "licenseType": "CTL",
    "issueDate": "2024-01-15",
    "gpsCoordinates": {
      "lat": -17.8252,
      "lng": 31.0335
    },
    "email": "contact@newtech.com",
    "applicationFeePaid": 800,
    "licenseFeePaid": 100000000,
    "validityPeriodYears": 15
  }'
```

**Response:** `201 Created`
```json
{
  "id": "lic-005",
  "companyName": "New Tech Solutions",
  "licenseType": "CTL",
  "issueDate": "2024-01-15",
  "gpsCoordinates": {
    "lat": -17.8252,
    "lng": 31.0335
  },
  "email": "contact@newtech.com",
  "applicationFeePaid": 800.0,
  "licenseFeePaid": 100000000.0,
  "validityPeriodYears": 15
}
```

**Validation Error Response:** `400 Bad Request`
```json
{
  "status": 400,
  "errors": {
    "companyName": "Company name is required",
    "email": "Invalid email format"
  },
  "timestamp": "2025-10-04T10:30:00"
}
```

---

### 4. Update License
Update an existing license.

**Endpoint:** `PUT /api/licenses/{id}`

**Request Body:** Same as Create License

**Example Request:**
```bash
curl -X PUT http://localhost:8080/api/licenses/lic-001 \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Global Connect Inc. (Updated)",
    "licenseType": "CTL",
    "issueDate": "2010-05-20",
    "gpsCoordinates": {
      "lat": -17.8252,
      "lng": 31.0335
    },
    "email": "contact@globalconnect.com",
    "applicationFeePaid": 800,
    "licenseFeePaid": 100000000,
    "validityPeriodYears": 15
  }'
```

**Response:** `200 OK`
```json
{
  "id": "lic-001",
  "companyName": "Global Connect Inc. (Updated)",
  "licenseType": "CTL",
  "issueDate": "2010-05-20",
  "gpsCoordinates": {
    "lat": -17.8252,
    "lng": 31.0335
  },
  "email": "contact@globalconnect.com",
  "applicationFeePaid": 800.0,
  "licenseFeePaid": 100000000.0,
  "validityPeriodYears": 15
}
```

---

### 5. Delete License
Delete a license by ID.

**Endpoint:** `DELETE /api/licenses/{id}`

**Example Request:**
```bash
curl -X DELETE http://localhost:8080/api/licenses/lic-001
```

**Response:** `204 No Content`

---

## Companies API

### 1. Get All Companies
Retrieve all companies with optional filtering.

**Endpoint:** `GET /api/companies`

**Query Parameters:**
- `name` (optional): Search by company name (case-insensitive)

**Example Requests:**
```bash
# Get all companies
curl http://localhost:8080/api/companies

# Search by name
curl http://localhost:8080/api/companies?name=Global
```

**Response:** `200 OK`
```json
[
  {
    "id": "comp-001",
    "name": "Global Connect Inc.",
    "gpsCoordinates": {
      "lat": -17.8252,
      "lng": 31.0335
    },
    "email": "contact@globalconnect.com",
    "contactPerson": "John Doe",
    "address": "123 Main Street, Harare, Zimbabwe"
  }
]
```

---

### 2. Get Company by ID
Retrieve a specific company by its ID.

**Endpoint:** `GET /api/companies/{id}`

**Example Request:**
```bash
curl http://localhost:8080/api/companies/comp-001
```

**Response:** `200 OK`
```json
{
  "id": "comp-001",
  "name": "Global Connect Inc.",
  "gpsCoordinates": {
    "lat": -17.8252,
    "lng": 31.0335
  },
  "email": "contact@globalconnect.com",
  "contactPerson": "John Doe",
  "address": "123 Main Street, Harare, Zimbabwe"
}
```

---

### 3. Create Company
Create a new company.

**Endpoint:** `POST /api/companies`

**Request Body:**
```json
{
  "name": "New Media Corp",
  "gpsCoordinates": {
    "lat": -17.8252,
    "lng": 31.0335
  },
  "email": "info@newmedia.com",
  "contactPerson": "Sarah Williams",
  "address": "456 Business Park, Harare, Zimbabwe"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:8080/api/companies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Media Corp",
    "gpsCoordinates": {
      "lat": -17.8252,
      "lng": 31.0335
    },
    "email": "info@newmedia.com",
    "contactPerson": "Sarah Williams",
    "address": "456 Business Park, Harare, Zimbabwe"
  }'
```

**Response:** `201 Created`
```json
{
  "id": "comp-005",
  "name": "New Media Corp",
  "gpsCoordinates": {
    "lat": -17.8252,
    "lng": 31.0335
  },
  "email": "info@newmedia.com",
  "contactPerson": "Sarah Williams",
  "address": "456 Business Park, Harare, Zimbabwe"
}
```

---

### 4. Update Company
Update an existing company.

**Endpoint:** `PUT /api/companies/{id}`

**Request Body:** Same as Create Company

**Example Request:**
```bash
curl -X PUT http://localhost:8080/api/companies/comp-001 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Global Connect Inc.",
    "gpsCoordinates": {
      "lat": -17.8252,
      "lng": 31.0335
    },
    "email": "newcontact@globalconnect.com",
    "contactPerson": "Jane Doe",
    "address": "123 Main Street, Harare, Zimbabwe"
  }'
```

**Response:** `200 OK`

---

### 5. Delete Company
Delete a company by ID.

**Endpoint:** `DELETE /api/companies/{id}`

**Example Request:**
```bash
curl -X DELETE http://localhost:8080/api/companies/comp-001
```

**Response:** `204 No Content`

---

## Health Check API

### Get Health Status
Check if the application is running.

**Endpoint:** `GET /api/health`

**Example Request:**
```bash
curl http://localhost:8080/api/health
```

**Response:** `200 OK`
```json
{
  "status": "UP",
  "timestamp": "2025-10-04T10:30:00",
  "application": "ZIM License Co Backend",
  "version": "1.0.0"
}
```

---

## License Types

### CTL (Cellular Telecommunications License)
- Application Fee: $800
- License Fee: $100,000,000
- Validity Period: 15 years (fixed)

### PRSL (Public Radio Station License)
- Application Fee: $350
- License Fee: $2,000,000
- Validity Period: Variable (typically 5-10 years)

---

## Error Responses

### Validation Error (400)
```json
{
  "status": 400,
  "errors": {
    "fieldName": "Error message"
  },
  "timestamp": "2025-10-04T10:30:00"
}
```

### Not Found / Business Logic Error (400)
```json
{
  "status": 400,
  "message": "Error message",
  "timestamp": "2025-10-04T10:30:00"
}
```

### Internal Server Error (500)
```json
{
  "status": 500,
  "message": "An unexpected error occurred",
  "timestamp": "2025-10-04T10:30:00"
}
```

---

## Testing with Postman

1. Import the included Postman collection (if available)
2. Set the base URL to `http://localhost:8080`
3. Start testing the endpoints

## Testing with curl

All examples above use curl. Make sure the backend is running on port 8080.

---

## CORS

All endpoints support CORS with the following configuration:
- Allowed Origins: `*` (all origins)
- Allowed Methods: `GET, POST, PUT, DELETE, PATCH, OPTIONS`
- Allowed Headers: `*`
- Credentials: Allowed

---

## Rate Limiting

Currently, no rate limiting is implemented. This should be added in production.

---

## Notes

- All IDs are UUIDs generated automatically
- Dates are in `YYYY-MM-DD` format
- GPS coordinates use standard latitude/longitude format
- All monetary values are in decimal format with 2 decimal places
- Timestamps are in ISO 8601 format

