#!/bin/bash

# Restart Railway backend to clear cache
# This uses Railway CLI

echo "🔄 Restarting Railway backend to clear category cache..."

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it:"
    echo "   npm i -g @railway/cli"
    echo ""
    echo "Or restart manually at: https://railway.app/project/docker-composeyaml-production"
    exit 1
fi

# Restart the service
railway restart --service backend

echo "✅ Backend restart initiated!"
echo "⏳ Wait 30 seconds for the backend to restart..."
echo ""
echo "Then check: https://docker-composeyaml-production.up.railway.app/api/paintings/categories"



