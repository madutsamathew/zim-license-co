#!/bin/bash

echo "========================================="
echo "  ZIM License Co - Backend Startup"
echo "========================================="
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Error: Java is not installed or not in PATH"
    echo "Please install Java 25 or higher"
    exit 1
fi

# Display Java version
echo "✓ Java version:"
java -version 2>&1 | head -n 1
echo ""

# Check if MySQL is running
echo "Checking MySQL connection..."
if command -v mysql &> /dev/null; then
    if mysql -uroot -pdmp16@2004 -e "SELECT 1;" &> /dev/null; then
        echo "✓ MySQL is running and accessible"
    else
        echo "⚠️  Warning: Cannot connect to MySQL"
        echo "   Make sure MySQL is running with credentials: root/dmp16@2004"
        echo "   Or start it with: docker-compose up -d"
    fi
else
    echo "⚠️  MySQL client not found, skipping connection check"
fi
echo ""

# Build the project
echo "Building the project..."
./mvnw clean install -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi
echo "✓ Build successful"
echo ""

# Run the application
echo "Starting Spring Boot application..."
echo "Application will be available at: http://localhost:8080"
echo "API endpoints: http://localhost:8080/api"
echo ""
echo "Press Ctrl+C to stop the application"
echo "========================================="
echo ""

./mvnw spring-boot:run

