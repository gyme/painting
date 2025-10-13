#!/bin/bash

# Quick script to open the admin tool

echo "🎨 Opening Painting Admin Tool..."
echo ""

# Check if backend is running
if curl -s http://localhost:8080/api/paintings?page=0&size=1 > /dev/null 2>&1; then
    echo "✅ Backend is running on port 8080"
    echo ""
    echo "Opening admin tool..."
    open admin-tool.html
else
    echo "❌ Backend is not running!"
    echo ""
    echo "Please start the backend first:"
    echo "  cd backend && ./mvnw spring-boot:run"
    echo ""
    read -p "Would you like to start the backend now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Starting backend..."
        cd backend && ./mvnw spring-boot:run &
        sleep 5
        echo ""
        echo "Backend starting... Opening admin tool in a moment..."
        sleep 3
        open ../admin-tool.html
    fi
fi

