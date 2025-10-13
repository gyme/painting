#!/bin/bash

# Safe frontend deployment script with automated testing
# This script tests the mobile layout before deploying to Vercel

set -e  # Exit on any error

echo "🧪 Starting safe deployment process..."
echo ""

cd frontend

# Check if Playwright is installed
if ! npm list @playwright/test > /dev/null 2>&1; then
    echo "📦 Installing Playwright..."
    npm install
    echo "🌐 Installing browser..."
    npm run test:install
fi

# Run the mobile layout test
echo "🧪 Running mobile layout tests..."
echo "This will verify:"
echo "  ✓ Canvas is not cropped by fixed controls"
echo "  ✓ Page zoom is enabled"
echo ""

if npm run test:mobile; then
    echo ""
    echo "✅ All tests passed!"
    echo ""
    
    # Ask for confirmation to deploy
    read -p "Deploy to Vercel? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 Deploying to Vercel..."
        cd ..
        echo "y" | ./deploy-frontend-vercel.sh
        echo ""
        echo "✨ Deployment complete!"
    else
        echo "❌ Deployment cancelled"
        exit 0
    fi
else
    echo ""
    echo "❌ Tests failed!"
    echo "🚫 Deployment blocked to prevent mobile layout issues"
    echo ""
    echo "Please fix the issues and run this script again."
    exit 1
fi

