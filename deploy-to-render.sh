#!/bin/bash

# 🚀 Render.com Deployment Helper Script
# This script helps you prepare your app for Render deployment

set -e  # Exit on error

echo "🎨 Coloring App - Render.com Deployment Helper"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Before you begin:${NC}"
echo "1. Create a Render.com account at https://render.com"
echo "2. Create a PostgreSQL database"
echo "3. Have your database credentials ready"
echo ""
read -p "Press Enter when ready to continue..."

echo ""
echo -e "${BLUE}Step 1: Building Frontend${NC}"
cd frontend

# Build frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo "🔨 Building frontend for production..."
npm run build
echo -e "${GREEN}✅ Frontend build complete!${NC}"

cd ..

echo ""
echo -e "${BLUE}Step 2: Building Backend${NC}"
cd backend

echo "🔨 Building backend..."
if [ -f "mvnw" ]; then
    ./mvnw clean package -DskipTests
else
    mvn clean package -DskipTests
fi
echo -e "${GREEN}✅ Backend build complete!${NC}"

cd ..

echo ""
echo -e "${BLUE}Step 3: Preparing Render Configuration Files${NC}"

# Create render.yaml for easy deployment
cat > render.yaml << 'EOF'
services:
  # Backend Service
  - type: web
    name: coloring-app-backend
    env: java
    buildCommand: ./mvnw clean package -DskipTests
    startCommand: java -jar target/kids-painting-backend-1.0.0.jar
    envVars:
      - key: SPRING_DATASOURCE_URL
        sync: false
      - key: SPRING_DATASOURCE_USERNAME
        sync: false
      - key: SPRING_DATASOURCE_PASSWORD
        sync: false
      - key: JAVA_OPTS
        value: "-Xmx512m"
    healthCheckPath: /api/paintings

  # Frontend Service
  - type: web
    name: coloring-app-frontend
    env: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: ./frontend/dist
    envVars:
      - key: VITE_API_URL
        value: https://coloring-app-backend.onrender.com/api

databases:
  - name: coloring-app-db
    databaseName: coloring_app
    user: coloring_user
EOF

echo -e "${GREEN}✅ Created render.yaml${NC}"

# Create a deployment info file
cat > DEPLOYMENT_INFO.md << 'EOF'
# 🚀 Render.com Deployment Instructions

## Your app is ready to deploy!

### Option A: Deploy via Render Dashboard (Easiest)

#### 1. Deploy Backend:
1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Choose "Build and deploy from a Git repository" (or manual deploy)

**Settings:**
- **Name:** `coloring-app-backend`
- **Environment:** `Java`
- **Build Command:** `./mvnw clean package -DskipTests`
- **Start Command:** `java -jar target/kids-painting-backend-1.0.0.jar`

**Environment Variables:**
```
SPRING_DATASOURCE_URL=<your-database-url>
SPRING_DATASOURCE_USERNAME=<your-db-username>
SPRING_DATASOURCE_PASSWORD=<your-db-password>
```

#### 2. Deploy Frontend:
1. Click "New +" → "Static Site"

**Settings:**
- **Name:** `coloring-app-frontend`
- **Build Command:** `cd frontend && npm install && npm run build`
- **Publish Directory:** `frontend/dist`

**Environment Variables:**
```
VITE_API_URL=https://coloring-app-backend.onrender.com/api
```
(Replace with YOUR backend URL)

### Option B: Deploy via Blueprint (render.yaml)

1. Push your code to GitHub
2. In Render dashboard: "New +" → "Blueprint"
3. Connect your repository
4. Render will auto-detect `render.yaml` and deploy everything!

---

## After Deployment:

### Import Your Images:
```bash
API_URL=https://coloring-app-backend.onrender.com/api/paintings \
  node tools/bulk-import-paintings.js frontend/public/coloring-images --skip-existing
```

### Your Live URLs:
- Frontend: `https://coloring-app-frontend.onrender.com`
- Backend: `https://coloring-app-backend.onrender.com`

---

## ⚠️ Important Notes:

1. **Free Tier Spin-Down:**
   - Backend sleeps after 15 minutes of inactivity
   - First request takes ~30 seconds to wake up
   - Subsequent requests are instant

2. **Keep Backend Awake (Optional):**
   - Use https://uptimerobot.com (free)
   - Ping your API every 5 minutes

3. **Database Backups:**
   - Render automatically backs up your database
   - Free tier: 7 day retention

---

## 🎉 You're Done!

Visit your site and enjoy your coloring app!
EOF

echo -e "${GREEN}✅ Created DEPLOYMENT_INFO.md${NC}"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Deployment Preparation Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo "1️⃣  Read the instructions:"
echo "   open DEPLOYMENT_INFO.md"
echo ""
echo "2️⃣  Go to Render.com:"
echo "   https://render.com/dashboard"
echo ""
echo "3️⃣  Create PostgreSQL Database:"
echo "   - Click 'New +' → 'PostgreSQL'"
echo "   - Name: coloring-app-db"
echo "   - Plan: Free"
echo "   - Copy the credentials!"
echo ""
echo "4️⃣  Deploy Backend:"
echo "   - Click 'New +' → 'Web Service'"
echo "   - Upload backend files"
echo "   - Add database credentials"
echo ""
echo "5️⃣  Deploy Frontend:"
echo "   - Click 'New +' → 'Static Site'"
echo "   - Upload frontend files"
echo "   - Add backend URL"
echo ""
echo "6️⃣  Import Images:"
echo "   API_URL=<your-backend-url>/api/paintings \\"
echo "     node tools/bulk-import-paintings.js frontend/public/coloring-images"
echo ""
echo -e "${GREEN}🎉 Your app will be live in ~5 minutes!${NC}"
echo ""
echo "Need help? Check:"
echo "  📖 FREE_DEPLOYMENT_GUIDE.md (detailed guide)"
echo "  📖 DEPLOYMENT_INFO.md (quick reference)"
echo ""
