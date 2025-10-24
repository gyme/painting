#!/bin/bash

# This script helps you save your logo to the frontend public folder
# Usage: Place your logo.png in the current directory and run this script

echo "🎨 Saving logo to frontend/public/ directory..."

# Check if logo file exists in current directory
if [ ! -f "logo.png" ]; then
    echo "❌ Error: logo.png not found in current directory"
    echo "Please save your logo as 'logo.png' in this directory first, then run this script again"
    exit 1
fi

# Copy logo to public directory
cp logo.png frontend/public/logo.png

echo "✅ Logo saved successfully to frontend/public/logo.png"
echo "🚀 You can now test the website with: cd frontend && npm run dev"


