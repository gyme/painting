#!/bin/bash

# Verify Deployment Health
# This script checks if both backend and frontend are working correctly

echo "🔍 Deployment Verification"
echo "=========================="
echo ""

# Get backend URL
echo "Enter your Railway backend URL (e.g., https://your-app.railway.app):"
read -p "Backend URL: " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    echo "❌ Backend URL is required"
    exit 1
fi

# Remove trailing slash
BACKEND_URL="${BACKEND_URL%/}"

# Get frontend URL
echo ""
echo "Enter your Vercel frontend URL (e.g., https://your-app.vercel.app):"
read -p "Frontend URL: " FRONTEND_URL

if [ -z "$FRONTEND_URL" ]; then
    echo "❌ Frontend URL is required"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Testing Backend on Railway"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test backend health
echo "1. Testing backend health endpoint..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${BACKEND_URL}/api/paintings" -m 10)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "204" ]; then
    echo "   ✅ Backend is responding (HTTP $HTTP_CODE)"
else
    echo "   ⚠️  Backend returned HTTP $HTTP_CODE"
fi

# Test API endpoint
echo ""
echo "2. Testing paintings API endpoint..."
RESPONSE=$(curl -s "${BACKEND_URL}/api/paintings?page=0&size=5" -m 10)

if echo "$RESPONSE" | grep -q "content"; then
    COUNT=$(echo "$RESPONSE" | grep -o '"totalElements":[0-9]*' | head -1 | grep -o '[0-9]*')
    echo "   ✅ API is working! Found $COUNT paintings"
else
    echo "   ⚠️  API response seems incorrect"
    echo "   Response: $RESPONSE"
fi

# Test categories endpoint
echo ""
echo "3. Testing categories endpoint..."
CATEGORIES=$(curl -s "${BACKEND_URL}/api/paintings/categories" -m 10)

if [ ! -z "$CATEGORIES" ] && [ "$CATEGORIES" != "[]" ]; then
    echo "   ✅ Categories loaded successfully"
    echo "   Categories: $CATEGORIES"
else
    echo "   ⚠️  No categories found or endpoint error"
fi

# Test CORS
echo ""
echo "4. Testing CORS configuration..."
CORS_HEADER=$(curl -s -I "${BACKEND_URL}/api/paintings" -H "Origin: ${FRONTEND_URL}" | grep -i "access-control-allow-origin" || echo "none")

if [ "$CORS_HEADER" != "none" ]; then
    echo "   ✅ CORS is configured"
    echo "   $CORS_HEADER"
else
    echo "   ⚠️  CORS might not be configured correctly"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Testing Frontend on Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test frontend
echo "1. Testing frontend availability..."
FRONTEND_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${FRONTEND_URL}" -m 10)

if [ "$FRONTEND_CODE" = "200" ]; then
    echo "   ✅ Frontend is live (HTTP $FRONTEND_CODE)"
else
    echo "   ⚠️  Frontend returned HTTP $FRONTEND_CODE"
fi

# Test if frontend can be loaded
echo ""
echo "2. Testing frontend content..."
FRONTEND_CONTENT=$(curl -s "${FRONTEND_URL}" -m 10)

if echo "$FRONTEND_CONTENT" | grep -q "<title>"; then
    TITLE=$(echo "$FRONTEND_CONTENT" | grep -o "<title>[^<]*</title>" | head -1)
    echo "   ✅ Frontend HTML loaded successfully"
    echo "   $TITLE"
else
    echo "   ⚠️  Could not verify frontend content"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Verification Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Backend URL:  $BACKEND_URL"
echo "Frontend URL: $FRONTEND_URL"
echo ""
echo "Next Steps:"
echo "  1. Open frontend in browser: $FRONTEND_URL"
echo "  2. Check if paintings load correctly"
echo "  3. Test navigation and search"
echo "  4. Monitor logs for any errors"
echo ""
echo "Monitoring Commands:"
echo "  • Railway logs: cd backend && railway logs"
echo "  • Vercel logs:  cd frontend && vercel logs"
echo ""

