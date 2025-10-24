#!/bin/bash

# Deploy Italian Brainrot paintings directly to Railway production
set -e

echo "🇮🇹 Deploying Italian Brainrot Paintings to Production..."
echo "=========================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "backend/add-italian-brainrot.sql" ]; then
    echo "❌ Error: backend/add-italian-brainrot.sql not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Error: Railway CLI not found!"
    echo ""
    echo "Please install Railway CLI:"
    echo "  npm install -g @railway/cli"
    echo ""
    echo "Or use alternative methods from ITALIAN_BRAINROT_ADDED.md"
    exit 1
fi

echo "✅ Railway CLI found"
echo ""

# Change to backend directory (where railway project is linked)
cd backend

echo "📊 Executing SQL on Railway database..."
echo ""

# Execute the SQL file
railway run psql -f add-italian-brainrot.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully deployed Italian Brainrot paintings!"
    echo ""
    echo "🎨 New paintings added:"
    echo "  1. Brr Brr Patapim"
    echo "  2. Cappuccino Assassino"
    echo "  3. Capuchina Ballerina"
    echo "  4. Chimpanzini Bananini"
    echo "  5. Lirili Larila"
    echo "  6. Thung Thung Thung Sahur"
    echo "  7. Tralalero Tralala"
    echo "  8. Udin Din Din Dun"
    echo ""
    echo "✨ All paintings include Spanish translations!"
    echo "📁 Category: Italian Brainrot"
    echo ""
    
    # Verify the paintings were added
    echo "🔍 Verifying paintings..."
    echo ""
    
    railway run psql -c "SELECT COUNT(*) as italian_brainrot_count FROM paintings WHERE category = 'Italian Brainrot';"
    
    echo ""
    echo "🌐 View your production site:"
    echo "   Frontend: https://painting-sand.vercel.app"
    echo "   Backend: https://docker-composeyaml-production.up.railway.app"
    echo ""
    echo "🎉 Deployment complete!"
else
    echo ""
    echo "❌ Failed to deploy paintings"
    echo ""
    echo "Please try one of these alternatives:"
    echo "1. Run manually via Railway console"
    echo "2. Check ITALIAN_BRAINROT_ADDED.md for other options"
    exit 1
fi





