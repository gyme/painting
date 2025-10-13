#!/bin/bash

# Deploy Backend to Railway
# This script automates the deployment of the Spring Boot backend to Railway

set -e

echo "🚂 Deploying Backend to Railway..."
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed!"
    echo "Install it with: npm install -g @railway/cli"
    exit 1
fi

# Navigate to backend directory
cd backend

echo "✅ Railway CLI found"
echo ""

# Check if user is logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway..."
    railway login
fi

echo "✅ Logged in to Railway"
echo ""

# Check if project exists
if ! railway status &> /dev/null; then
    echo "📦 No Railway project found. Creating new project..."
    railway init
    echo ""
    echo "⚠️  Important: Add PostgreSQL database"
    echo "Run: railway add"
    echo "Then select PostgreSQL"
    echo ""
    read -p "Press enter after adding PostgreSQL..."
fi

echo "🔨 Building and deploying backend..."
railway up

echo ""
echo "🌐 Getting deployment URL..."
BACKEND_URL=$(railway domain 2>&1 | grep -o 'https://[^[:space:]]*' || echo "")

if [ -z "$BACKEND_URL" ]; then
    echo "⚠️  No domain found. Generate one with:"
    echo "railway domain"
else
    echo "✅ Backend deployed to: $BACKEND_URL"
    echo ""
    echo "📝 Save this URL for frontend configuration:"
    echo "   VITE_API_URL=$BACKEND_URL/api"
fi

echo ""
echo "📊 View logs with: railway logs"
echo "🌐 Dashboard: https://railway.app/dashboard"
echo ""
echo "✨ Backend deployment complete!"

