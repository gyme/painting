#!/bin/bash

echo "🔄 Restarting Backend to Clear Cache..."
echo "========================================"
echo ""

# Find the maven spring-boot process
BACKEND_PID=$(ps aux | grep "spring-boot:run" | grep -v grep | awk '{print $2}')

if [ ! -z "$BACKEND_PID" ]; then
    echo "📦 Stopping backend (PID: $BACKEND_PID)..."
    kill $BACKEND_PID
    sleep 2
    echo "✅ Backend stopped"
else
    echo "⚠️  Backend not running"
fi

echo ""
echo "🚀 Starting backend..."
echo ""

cd backend

# Start backend in the background
nohup mvn spring-boot:run > ../backend.log 2>&1 &
NEW_PID=$!

echo "✅ Backend starting with PID: $NEW_PID"
echo "📋 Logs available at: backend.log"
echo ""
echo "⏳ Waiting for backend to start (this takes ~10 seconds)..."

# Wait for backend to be ready
for i in {1..30}; do
    if curl -s http://localhost:8080/api/paintings/categories > /dev/null 2>&1; then
        echo ""
        echo "✅ Backend is ready!"
        echo ""
        echo "📊 Current categories:"
        curl -s http://localhost:8080/api/paintings/categories | jq -r '.[]' | sed 's/^/  - /'
        echo ""
        
        # Check if Italian Brainrot is there
        if curl -s http://localhost:8080/api/paintings/categories | grep -q "Italian Brainrot"; then
            echo "🎉 Italian Brainrot category is now available!"
        else
            echo "⚠️  Italian Brainrot not found in categories"
        fi
        
        echo ""
        echo "🌐 Frontend: http://localhost:3000"
        echo "🔗 Backend API: http://localhost:8080/api"
        exit 0
    fi
    echo -n "."
    sleep 1
done

echo ""
echo "⚠️  Backend taking longer than expected to start"
echo "   Check the logs: tail -f backend.log"





