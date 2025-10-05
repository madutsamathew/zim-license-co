# ZIM License Co - Backend

A Spring Boot REST API for managing telecommunications and radio station licenses in Zimbabwe.

## Features

- **License Management**: Create, read, update, and delete licenses (CTL and PRSL)
- **Company Management**: Manage company information
- **RESTful API**: Clean REST endpoints with proper HTTP methods
- **Database Migrations**: Flyway-based schema management
- **Validation**: Input validation with clear error messages
- **CORS Support**: Configured for frontend integration
- **Exception Handling**: Global exception handler for consistent error responses

## Technology Stack

- Java 25
- Spring Boot 3.5.6
- Spring Data JPA
- Spring Security (permissive configuration)
- MySQL Database
- Flyway for migrations
- Lombok for reducing boilerplate
- Maven for dependency management

## Prerequisites

- Java 25 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## Setup Instructions

### 1. Database Setup

Make sure MySQL is running and create a database:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE zim_license_db;
```

Alternatively, the database will be created automatically if you set `createDatabaseIfNotExist=true` in the connection string (already configured).

### 2. Configure Database Connection

Update `src/main/resources/application.properties` if your MySQL credentials are different:

```properties
spring.datasource.username=root
spring.datasource.password=root
```

### 3. Build the Project

```bash
cd zim-license-co
./mvnw clean install
```

### 4. Run the Application

```bash
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Licenses

- `GET /api/licenses` - Get all licenses
  - Query params: `type` (CTL/PRSL), `companyName`
- `GET /api/licenses/{id}` - Get license by ID
- `POST /api/licenses` - Create a new license
- `PUT /api/licenses/{id}` - Update a license
- `DELETE /api/licenses/{id}` - Delete a license

### Companies

- `GET /api/companies` - Get all companies
  - Query params: `name`
- `GET /api/companies/{id}` - Get company by ID
- `POST /api/companies` - Create a new company
- `PUT /api/companies/{id}` - Update a company
- `DELETE /api/companies/{id}` - Delete a company

### Health Check

- `GET /actuator/health` - Application health status

## Sample API Requests

### Create a License

```bash
curl -X POST http://localhost:8080/api/licenses \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Company",
    "licenseType": "CTL",
    "issueDate": "2024-01-01",
    "gpsCoordinates": {
      "lat": -17.8252,
      "lng": 31.0335
    },
    "email": "test@company.com",
    "applicationFeePaid": 800,
    "licenseFeePaid": 100000000,
    "validityPeriodYears": 15
  }'
```

### Get All Licenses

```bash
curl http://localhost:8080/api/licenses
```

### Get Licenses by Type

```bash
curl http://localhost:8080/api/licenses?type=CTL
```

## Database Schema

### Companies Table
- `id` (VARCHAR) - Primary key (UUID)
- `name` (VARCHAR) - Company name (unique)
- `latitude` (DOUBLE) - GPS latitude
- `longitude` (DOUBLE) - GPS longitude
- `email` (VARCHAR) - Contact email
- `contact_person` (VARCHAR) - Contact person name
- `address` (VARCHAR) - Physical address
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### Licenses Table
- `id` (VARCHAR) - Primary key (UUID)
- `company_name` (VARCHAR) - Company name
- `license_type` (VARCHAR) - CTL or PRSL
- `issue_date` (DATE) - License issue date
- `latitude` (DOUBLE) - GPS latitude
- `longitude` (DOUBLE) - GPS longitude
- `email` (VARCHAR) - Contact email
- `application_fee_paid` (DECIMAL) - Application fee amount
- `license_fee_paid` (DECIMAL) - License fee amount
- `validity_period_years` (INT) - License validity in years
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

## License Types

### CTL (Cellular Telecommunications License)
- Application Fee: $800
- License Fee: $100,000,000
- Validity Period: 15 years (fixed)
- Annual Frequency Fee: $0
- Universal Services Fund: $3,000

### PRSL (Public Radio Station License)
- Application Fee: $350
- License Fee: $2,000,000
- Validity Period: Variable (5-10 years)
- Annual Frequency Fee: $2,000
- Universal Services Fund: $0

## Development

### Project Structure

```
src/main/java/com/zim_license_co/zim_license_co/
├── config/          # Configuration classes (CORS, Security)
├── controller/      # REST controllers
├── domain/          # Entity classes
├── dto/             # Data Transfer Objects
├── exception/       # Exception handling
├── mapper/          # Entity-DTO mappers
├── repository/      # JPA repositories
└── service/         # Business logic services
```

### Building for Production

```bash
./mvnw clean package -DskipTests
java -jar target/zim-license-co-0.0.1-SNAPSHOT.jar
```

## Testing

Run tests with:

```bash
./mvnw test
```

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Verify credentials in `application.properties`
- Check if port 3306 is available

### Port Already in Use
Change the server port in `application.properties`:
```properties
server.port=8081
```

### Flyway Migration Errors
If migrations fail, you can reset the database:
```sql
DROP DATABASE zim_license_db;
CREATE DATABASE zim_license_db;
```

## License

Copyright © 2025 ZIM License Co

