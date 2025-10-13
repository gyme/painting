#!/bin/bash

# Deploy Full Application to Vercel + Railway
# This script deploys both backend and frontend

set -e

echo "🚀 Full Application Deployment"
echo "==============================="
echo ""
echo "This will deploy:"
echo "  • Backend (Spring Boot) → Railway"
echo "  • Frontend (React) → Vercel"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

# Step 1: Deploy Backend
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Deploying Backend to Railway"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

./deploy-backend-railway.sh

BACKEND_URL=""
echo ""
read -p "Enter your Railway backend URL: " BACKEND_URL

# Step 2: Deploy Frontend
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Deploying Frontend to Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ ! -z "$BACKEND_URL" ]; then
    echo "Backend URL: $BACKEND_URL"
    echo "Make sure to set VITE_API_URL=$BACKEND_URL/api in Vercel"
    echo ""
fi

./deploy-frontend-vercel.sh

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Deployment Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next Steps:"
echo "  1. Verify backend is running"
echo "  2. Test frontend can connect to backend"
echo "  3. Check CORS configuration"
echo "  4. Initialize database if needed"
echo ""
echo "Useful Commands:"
echo "  • Backend logs: cd backend && railway logs"
echo "  • Frontend logs: cd frontend && vercel logs"
echo ""

