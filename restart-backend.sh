#!/bin/bash
echo "Restarting backend server..."
echo ""

# Find and kill existing backend process
pkill -f "spring-boot:run" || echo "No existing backend process found"
sleep 2

# Start backend
echo "Starting backend..."
cd backend && ./mvnw spring-boot:run &

echo ""
echo "Backend is starting..."
echo "Wait a few seconds for it to fully start, then try the admin tool again."
