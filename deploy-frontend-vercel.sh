#!/bin/bash

# Deploy Frontend to Vercel
# This script automates the deployment of the React frontend to Vercel

set -e

echo "▲ Deploying Frontend to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed!"
    echo "Install it with: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI found"
echo ""

# Navigate to frontend directory
cd frontend

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

echo "✅ Logged in to Vercel"
echo ""

# Check if VITE_API_URL is set
echo "🔍 Checking environment variables..."
echo ""
echo "⚠️  Make sure you have set VITE_API_URL environment variable!"
echo ""
echo "To set it, run:"
echo "  vercel env add VITE_API_URL production"
echo ""
echo "Enter your Railway backend URL (e.g., https://your-backend.railway.app/api)"
echo ""
read -p "Have you set VITE_API_URL? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Setting environment variable..."
    vercel env add VITE_API_URL production
fi

echo ""
echo "🔨 Building and deploying frontend..."
vercel --prod

echo ""
echo "✨ Frontend deployment complete!"
echo ""
echo "🌐 Your app should be live at the URL shown above"
echo "📊 View dashboard at: https://vercel.com/dashboard"

