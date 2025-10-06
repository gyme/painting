#!/bin/bash

# 🚀 Import Images to Production Database
# This script imports all your coloring images to the production backend

set -e

echo "🎨 Import Coloring Images to Production"
echo "========================================"
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

read -p "Continue with import? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Import cancelled."
    exit 0
fi

echo ""
echo "🚀 Starting import..."
echo ""

# Set API URL and run import
API_URL="${BACKEND_URL}/api/paintings" node bulk-import-paintings.js ../frontend/public/coloring-images --skip-existing

echo ""
echo "✅ Import complete!"
echo ""
echo "🌐 Visit your site to see the paintings:"
echo "   https://painting-1.onrender.com"
echo ""
