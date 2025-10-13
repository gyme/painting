#!/bin/bash

# Serve the admin tool on a local web server
# This avoids CORS issues with file:// protocol

PORT=8081

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "🎨 Starting Admin Tool Server..."
echo ""
echo "  Admin Tool: http://localhost:$PORT/admin-tool.html"
echo "  Backend API: http://localhost:8080/api"
echo "  Serving from: $SCRIPT_DIR"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if backend is running
if ! curl -s http://localhost:8080/api/paintings?page=0&size=1 > /dev/null 2>&1; then
    echo "⚠️  Warning: Backend doesn't appear to be running on port 8080"
    echo "   You may need to start it first: cd backend && ./mvnw spring-boot:run"
    echo ""
fi

# Change to script directory to serve files from there
cd "$SCRIPT_DIR"

# Start simple HTTP server
if command -v python3 &> /dev/null; then
    echo "Starting Python HTTP server on port $PORT..."
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "Starting Python HTTP server on port $PORT..."
    python -m SimpleHTTPServer $PORT
else
    echo "❌ Python not found. Please install Python or open admin-tool.html directly."
    exit 1
fi

