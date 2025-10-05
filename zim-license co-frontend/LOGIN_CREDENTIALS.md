# Login Credentials

## Default User Accounts

### Admin Account
- **Email**: `admin@zimlicense.co`
- **Password**: `password`
- **Role**: ADMIN
- **Access**: Full system access

### Regulator Account
- **Email**: `regulator@zimlicense.co`
- **Password**: `password`
- **Role**: REGULATOR
- **Access**: View and manage all licenses

## How to Access

1. **Frontend URL**: http://localhost:8083 (or http://192.168.1.7:8083)
2. **Login Page**: http://localhost:8083/login
3. **Register Page**: http://localhost:8083/register

## Testing

### Test Login (Admin):
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@zimlicense.co", "password": "password"}'
```

### Test Login (Regulator):
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "regulator@zimlicense.co", "password": "password"}'
```

### Test Registration (Company):
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "company@example.com",
    "password": "yourpassword",
    "fullName": "Company Name",
    "role": "COMPANY",
    "companyName": "My Company",
    "phoneNumber": "+263771234567"
  }'
```

## Note

The password for default users is set to **"password"** for simplicity in development. 

**⚠️ IMPORTANT**: Change these passwords before deploying to production!

## Server Status

- **Backend**: http://localhost:8080 ✅
- **Frontend**: http://localhost:8083 ✅
- **Database**: MySQL on localhost:3306 ✅

## Troubleshooting

If login fails:
1. Check backend is running: `curl http://localhost:8080/api/health`
2. Verify users exist: Check MySQL database
3. Clear browser localStorage: `localStorage.clear()` in browser console
4. Check browser console for errors

## Next Steps

1. Login with admin account
2. Explore the dashboard
3. Try creating/viewing licenses
4. Register a new company account
5. Test different user roles

