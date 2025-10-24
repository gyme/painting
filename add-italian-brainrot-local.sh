#!/bin/bash

# Add Italian Brainrot paintings to local H2 database via H2 Console

echo "🇮🇹 Adding Italian Brainrot Paintings to Local Database..."
echo "=========================================================="
echo ""

# Check if backend is running
if ! curl -s http://localhost:8080/api/paintings > /dev/null 2>&1; then
    echo "❌ Error: Backend not running on port 8080"
    echo "Please start your backend first"
    exit 1
fi

echo "✅ Backend is running"
echo ""
echo "📊 Current categories:"
curl -s http://localhost:8080/api/paintings/categories | jq -r '.[]' | sed 's/^/  - /'
echo ""

# H2 Console is available at:
echo "🌐 H2 Console available at: http://localhost:8080/api/h2-console"
echo ""
echo "To add the paintings, you have 2 options:"
echo ""
echo "OPTION 1 - Use H2 Console (Manual):"
echo "  1. Open: http://localhost:8080/api/h2-console"
echo "  2. Login with:"
echo "     - JDBC URL: jdbc:h2:file:./painting"
echo "     - User: sa"
echo "     - Password: (leave empty)"
echo "  3. Copy and paste SQL from: backend/add-italian-brainrot-h2.sql"
echo "  4. Click 'Run'"
echo ""
echo "OPTION 2 - Restart Backend with SQL (Recommended):"
echo "  1. Stop the current backend (Ctrl+C in the backend terminal)"
echo "  2. Run this command in the backend directory:"
echo "     cd backend && mvn spring-boot:run"
echo ""
echo "The SQL file is ready at: backend/add-italian-brainrot-h2.sql"
echo ""
echo "After adding, refresh this page to see the new category!"





