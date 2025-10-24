#!/bin/bash

# Script to add Italian Brainrot paintings to the database
# This adds 8 new fun Italian meme-themed coloring pages

echo "🇮🇹 Adding Italian Brainrot Paintings..."
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "backend/add-italian-brainrot.sql" ]; then
    echo "❌ Error: backend/add-italian-brainrot.sql not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Try to connect to local database first
echo "📦 Attempting to add paintings to local database..."

# Check if backend service is running
if docker-compose -f backend/docker-compose.local.yml ps | grep -q "Up"; then
    echo "✅ Local backend is running"
    docker-compose -f backend/docker-compose.local.yml exec -T postgres psql -U painting painting < backend/add-italian-brainrot.sql
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully added Italian Brainrot paintings to local database!"
        echo ""
        echo "New paintings added:"
        echo "  1. Brr Brr Patapim"
        echo "  2. Cappuccino Assassino"
        echo "  3. Capuchina Ballerina"
        echo "  4. Chimpanzini Bananini"
        echo "  5. Lirili Larila"
        echo "  6. Thung Thung Thung Sahur"
        echo "  7. Tralalero Tralala"
        echo "  8. Udin Din Din Dun"
        echo ""
        echo "🎨 All paintings include Spanish translations!"
        echo "📁 Category: Italian Brainrot"
    else
        echo "❌ Failed to add paintings to database"
        exit 1
    fi
else
    echo "⚠️  Local backend is not running"
    echo ""
    echo "To apply these changes, you can:"
    echo ""
    echo "1. Start the backend and run this script again:"
    echo "   cd backend && docker-compose -f docker-compose.local.yml up -d"
    echo "   cd .. && ./add-italian-brainrot.sh"
    echo ""
    echo "2. Apply to production database via Railway:"
    echo "   railway run psql < backend/add-italian-brainrot.sql"
    echo ""
    echo "3. Or copy the SQL and run it manually in your database console"
fi





