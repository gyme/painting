#!/bin/bash

# 🔄 Sync Local Images to Production
# This script cleans up old data and imports fresh images

set -e

echo "🔄 Sync Coloring Images to Production"
echo "======================================"
echo ""

# Get production backend URL
read -p "Enter your BACKEND URL (e.g., https://your-backend.onrender.com): " BACKEND_URL

# Remove trailing slash if present
BACKEND_URL=${BACKEND_URL%/}

# Validate URL
if [[ ! $BACKEND_URL =~ ^https?:// ]]; then
    echo "❌ Invalid URL format. Must start with http:// or https://"
    exit 1
fi

echo ""
echo "📋 Configuration:"
echo "   Backend: $BACKEND_URL"
echo "   Images: ../frontend/public/coloring-images"
echo ""
echo "This will:"
echo "   1. ✅ Clean up old/invalid database entries"
echo "   2. ✅ Import all current images"
echo "   3. ✅ Skip duplicates"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Sync cancelled."
    exit 0
fi

echo ""
echo "🚀 Starting sync process..."
echo ""

# Change to tools directory
cd "$(dirname "$0")"

# Step 1: Cleanup
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Cleaning up database..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

API_URL="${BACKEND_URL}/api/paintings" node cleanup-database.js <<EOF
y
EOF

echo ""

# Step 2: Import
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Importing images..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

API_URL="${BACKEND_URL}/api/paintings" node bulk-import-paintings.js ../frontend/public/coloring-images --skip-existing <<EOF
y
EOF

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Sync Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Your production site is now synced!"
echo "   Visit: https://painting-1.onrender.com"
echo ""
echo "💡 Tip: Run this script anytime you:"
echo "   • Add new coloring pages"
echo "   • Remove old pages"
echo "   • Need to sync local → production"
echo ""
