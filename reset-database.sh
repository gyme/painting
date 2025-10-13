#!/bin/bash

echo "🗄️  Resetting Database to Fresh State"
echo "======================================="
echo ""

# Stop backend
echo "1. Stopping backend..."
pkill -f "spring-boot:run" 2>/dev/null
sleep 2

# Remove database files
echo "2. Removing old database files..."
cd /Users/guym/Documents/d/paiting/backend
rm -f painting.mv.db painting.trace.db
echo "   ✅ Database files removed"

# Start backend (it will create fresh database with sample data)
echo ""
echo "3. Starting backend..."
./start-backend.sh &
BACKEND_PID=$!

echo ""
echo "4. Waiting for backend to fully start (30 seconds)..."
sleep 30

# Check if backend is up
if curl -s 'http://localhost:8080/api/paintings?page=0&size=1' > /dev/null 2>&1; then
    echo "   ✅ Backend is UP!"
    echo ""
    echo "======================================="
    echo "✅ Database Reset Complete!"
    echo "======================================="
    echo ""
    echo "Next steps:"
    echo "  1. Open admin tool: http://localhost:8081/admin-tool.html"
    echo "  2. Edit paintings to update titles, categories, images, etc."
    echo "  3. All changes will persist (using file-based database now)"
    echo ""
else
    echo "   ⏳ Backend still starting... give it another minute"
fi

