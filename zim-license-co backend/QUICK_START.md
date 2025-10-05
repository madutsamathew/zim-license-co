# ZIM License Co - Quick Start Guide

## ✅ Your Database Configuration

The backend is configured to use **your existing MySQL database**:

```properties
Database: telecom_backend
Host: localhost:3306
Username: root
Password: dmp16@2004
```

---

## 🚀 Start the Backend (2 Options)

### Option 1: Use Your Existing MySQL Database (Recommended)

Since you already have MySQL running locally with your credentials, you can start the backend directly:

```bash
cd /Users/mac/Downloads/zim-license-co-2/zim-license-co
./start-backend.sh
```

This will:
1. ✅ Check Java installation
2. ✅ Connect to your existing MySQL at `localhost:3306`
3. ✅ Create database `telecom_backend` if it doesn't exist
4. ✅ Run Flyway migrations to create tables
5. ✅ Insert sample data
6. ✅ Start the backend on port 8080

### Option 2: Use Docker MySQL (If Preferred)

If you want to use a separate Docker MySQL instance instead:

```bash
cd /Users/mac/Downloads/zim-license-co-2/zim-license-co
./start-db.sh    # Start MySQL in Docker
./start-backend.sh
```

**Note:** The Docker MySQL will use the same credentials (root/dmp16@2004) and database name (telecom_backend).

---

## 🧪 Test the Backend

Once the backend is running, test it:

### 1. Health Check
```bash
curl http://localhost:8080/api/health
```

Expected response:
```json
{
  "status": "UP",
  "timestamp": "2025-10-04T...",
  "application": "ZIM License Co Backend",
  "version": "1.0.0"
}
```

### 2. Get All Licenses
```bash
curl http://localhost:8080/api/licenses
```

Should return 4 sample licenses.

### 3. Get All Companies
```bash
curl http://localhost:8080/api/companies
```

Should return 4 sample companies.

---

## 📊 Database Tables

The backend will automatically create these tables in your `telecom_backend` database:

### 1. `companies`
Stores company information (name, GPS coordinates, contact details)

### 2. `licenses`
Stores license information (CTL/PRSL types, fees, validity periods)

### 3. `flyway_schema_history`
Tracks database migrations (created automatically by Flyway)

---

## 🔌 API Endpoints

### Licenses API
```
GET    http://localhost:8080/api/licenses
GET    http://localhost:8080/api/licenses/{id}
POST   http://localhost:8080/api/licenses
PUT    http://localhost:8080/api/licenses/{id}
DELETE http://localhost:8080/api/licenses/{id}
```

### Companies API
```
GET    http://localhost:8080/api/companies
GET    http://localhost:8080/api/companies/{id}
POST   http://localhost:8080/api/companies
PUT    http://localhost:8080/api/companies/{id}
DELETE http://localhost:8080/api/companies/{id}
```

### Health API
```
GET    http://localhost:8080/api/health
```

---

## 🔗 Connect Your Frontend

Update your frontend to connect to the backend:

```javascript
// In your React app or wherever you make API calls
const API_BASE_URL = 'http://localhost:8080/api';

// Example: Fetch all licenses
fetch(`${API_BASE_URL}/licenses`)
  .then(response => response.json())
  .then(data => console.log('Licenses:', data))
  .catch(error => console.error('Error:', error));
```

Update your `useLicenseData.ts` hook to use the real API instead of mock data.

---

## 🛠️ Verify MySQL Connection

Before starting the backend, you can verify MySQL is accessible:

```bash
mysql -uroot -pdmp16@2004 -e "SHOW DATABASES;"
```

If this works, your MySQL is ready!

---

## 📝 Sample Data

The backend comes with 4 pre-populated licenses:

1. **Global Connect Inc.** - CTL license, issued 2010, expires 2025
2. **Capital FM** - PRSL license, issued 2022, expires 2032
3. **SpeedNet** - CTL license, issued 2018, expires 2033
4. **Radio Voice** - PRSL license, issued 2023, expires 2028

And 4 companies with matching information.

---

## 🐛 Troubleshooting

### Problem: "Cannot connect to MySQL"

**Solution 1:** Check if MySQL is running
```bash
# Check MySQL process
ps aux | grep mysql

# Try connecting manually
mysql -uroot -pdmp16@2004
```

**Solution 2:** Check if port 3306 is available
```bash
lsof -i :3306
```

### Problem: "Port 8080 already in use"

**Solution:** Change the backend port in `application.properties`:
```properties
server.port=8081
```

Then update your API calls to use port 8081.

### Problem: "Access denied for user 'root'"

**Solution:** Verify your MySQL password is correct:
```bash
mysql -uroot -pdmp16@2004 -e "SELECT 1"
```

If it fails, update the password in:
- `src/main/resources/application.properties`
- `docker-compose.yml` (if using Docker)
- `start-backend.sh`

---

## 🎯 Next Steps

1. **Start the backend** (as shown above)
2. **Test the API** using curl or your browser
3. **Update your frontend** to call the backend API
4. **Replace mock data** in your React hooks with real API calls

---

## 📖 More Documentation

- **README.md** - Detailed setup and configuration
- **API_DOCUMENTATION.md** - Complete API reference with examples
- **BACKEND_OVERVIEW.md** - Architecture and design details
- **BACKEND_BUILD_SUMMARY.md** - What was built

---

## ✨ Quick Commands

```bash
# Navigate to backend
cd /Users/mac/Downloads/zim-license-co-2/zim-license-co

# Start backend (with your existing MySQL)
./start-backend.sh

# Test health
curl http://localhost:8080/api/health

# Test licenses
curl http://localhost:8080/api/licenses

# Stop backend
# Press Ctrl+C in the terminal where it's running
```

---

**You're all set! 🚀**

Your backend is configured and ready to connect to your MySQL database at `localhost:3306/telecom_backend`.

