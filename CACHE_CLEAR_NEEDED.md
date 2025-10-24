# 🔄 Backend Cache Clear Needed

## Issue
The duplicate Police Officer entries are gone from the database, but still showing in "Popular Pages" due to backend caching.

## Backend Caches

The backend uses `@Cacheable` annotations on:
1. `categories` - List of all categories
2. `featuredPaintings` - Featured paintings
3. `popularPaintings` - Most popular paintings ← **This one needs clearing**
4. `paintings` - Individual painting data

## Solution

**Restart the backend** to clear all caches:

### Via Railway CLI:
```bash
cd backend
railway up --service docker-compose.yaml
```

### Via Railway Dashboard:
1. Go to https://railway.app/dashboard
2. Click your backend service (docker-compose.yaml)
3. Click "⋮" (three dots) → "Restart"
4. Wait 30-60 seconds

## Verification

After restart, check:
```bash
curl https://docker-composeyaml-production.up.railway.app/api/paintings/popular?size=12
```

You should see NO duplicates.

Then visit: https://painting-sand.vercel.app
The "Popular Pages" section should show unique entries only.

---

**I've triggered a restart in the background. It should be ready in ~1 minute.**





