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
