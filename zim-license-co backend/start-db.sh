#!/bin/bash

echo "========================================="
echo "  Starting MySQL Database with Docker"
echo "========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed or not in PATH"
    echo "Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Error: Docker daemon is not running"
    echo "Please start Docker Desktop"
    exit 1
fi

echo "✓ Docker is running"
echo ""

# Start MySQL container
echo "Starting MySQL container..."
docker-compose up -d

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo "✓ MySQL database is starting"
    echo ""
    echo "Connection Details:"
    echo "  Host: localhost"
    echo "  Port: 3306"
    echo "  Database: telecom_backend"
    echo "  Username: root"
    echo "  Password: dmp16@2004"
    echo ""
    echo "To stop the database, run:"
    echo "  docker-compose down"
    echo ""
    echo "To view logs:"
    echo "  docker-compose logs -f"
    echo "========================================="
else
    echo "❌ Failed to start MySQL container"
    exit 1
fi

