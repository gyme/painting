#!/bin/bash

# Start Backend Script
# This script builds and starts the Spring Boot backend

echo "🎨 Starting Kids Painting Backend..."
echo ""

# Kill any existing Spring Boot processes
echo "Checking for existing processes..."
pkill -f "spring-boot" 2>/dev/null && echo "Stopped existing backend" || echo "No existing backend found"

echo ""
echo "Building and starting backend..."
echo ""

# Start the backend
mvn spring-boot:run &

BACKEND_PID=$!
echo ""
echo "✅ Backend starting with PID: $BACKEND_PID"
echo ""
echo "Wait about 10-15 seconds for it to fully start..."
echo ""
echo "Once started, you can access:"
echo "  📡 API:        http://localhost:8080/api/paintings"
echo "  📚 Swagger:    http://localhost:8080/api/swagger-ui.html"
echo "  🗄️  H2 Console: http://localhost:8080/api/h2-console"
echo "     (Use JDBC URL: jdbc:h2:mem:painting_db)"
echo ""
echo "Press Ctrl+C to stop the backend"

# Wait for the process
wait $BACKEND_PID
