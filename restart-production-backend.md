# 🔄 Restart Production Backend to Show Italian Brainrot Category

## The Issue

The backend is **caching the old categories list**. The 8 Italian Brainrot paintings are in the database, but the backend's `@Cacheable` annotation is serving old data.

## ✅ Solution: Restart the Backend

You have 2 options:

### Option 1: Via Railway Dashboard (Easiest)

1. Go to https://railway.app/dashboard
2. Select your backend service (docker-compose.yaml)
3. Click the **"⋮"** menu (three dots)
4. Click **"Restart"**
5. Wait ~30 seconds for it to restart

### Option 2: Via Railway CLI

```bash
cd backend
railway redeploy
# Press 'y' when prompted
```

---

## ✅ After Restart, Verify:

Check that the category appears:

```bash
curl https://docker-composeyaml-production.up.railway.app/api/paintings/categories
```

You should see **"Italian Brainrot"** in the list.

Then check your production site:
- https://painting-sand.vercel.app
- Look for "Italian Brainrot 🇮🇹" in the categories

---

## What's Already Done ✅

- ✅ 8 Italian Brainrot paintings added to production database
- ✅ All paintings have Spanish translations
- ✅ Frontend deployed with Italian flag icon 🇮🇹
- ✅ Sitemap updated (242 URLs including new paintings)
- ✅ Translations added for "Italian Brainrot" / "Brainrot Italiano"

**Just need to restart backend to clear cache!** 🚀





