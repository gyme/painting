

# Database Sync Guide

This guide explains how to sync your local database with the remote production database.

## Current Status

### Local Images (42 total)
- **39 PNG files**
- **3 JPG files**

### Mandala Status
- ✅ **Owl Mandala**: Available (`owl_mandala.png`)
- ❌ **Elephant Mandala**: Removed (image corrupted)
- ❌ **Lion Mandala**: Removed (image corrupted)

## Sync Methods

### Method 1: Automated Sync (Recommended)

When the backend is running:

```bash
cd tools
./sync-database-simple.sh
```

This script will:
- Connect to the remote API
- Add Owl Mandala if missing
- Remove elephant and lion mandalas (no images)
- Verify the sync

### Method 2: Manual SQL Sync

If the automated script fails, connect to your Railway database and run:

```bash
cd backend
# Copy and run the SQL commands from sync-database.sql
```

Or use Railway CLI:
```bash
railway run psql < backend/sync-database.sql
```

### Method 3: Railway Dashboard

1. Go to [Railway Dashboard](https://railway.app)
2. Select your project
3. Go to the PostgreSQL database
4. Click "Connect" → "Query"
5. Run the SQL from `backend/sync-database.sql`

## Backend Not Accessible?

If you get "Cannot connect to remote API", check:

### 1. **Backend Service Status**
- Go to Railway dashboard
- Check if the backend service is running
- If sleeping/paused, wake it up

### 2. **Backend URL**
Current configured URL:
```
https://kids-painting-backend-production.up.railway.app/api
```

To test manually:
```bash
curl https://kids-painting-backend-production.up.railway.app/api/paintings?page=0&size=1
```

### 3. **Start Backend Locally**
```bash
cd backend
./start-backend.sh
```

Then sync to Railway database:
```bash
export REMOTE_API_URL="postgresql://your-railway-db-url"
cd tools
./sync-database-simple.sh
```

## What Gets Synced

### Paintings to Add
Only the **Owl Mandala** will be added if it doesn't exist in production:
- URL Key: `owl-mandala`
- Title: Owl Mandala
- Category: Mandalas
- Image: `/coloring-images/owl_mandala.png`
- Difficulty: 3 (Intermediate)
- Featured: Yes

### Paintings to Remove
These will be removed from production (images don't exist):
- `elephant-mandala` - Image was corrupted
- `lion-mandala` - Image was corrupted

### Existing Paintings
All other paintings (~87+) will remain unchanged.

## Verification

After syncing, verify in production:

1. **Check Owl Mandala exists:**
   ```bash
   curl https://kids-painting-backend-production.up.railway.app/api/paintings/owl-mandala
   ```

2. **Check elephant/lion removed:**
   ```bash
   curl https://kids-painting-backend-production.up.railway.app/api/paintings/elephant-mandala
   # Should return 404
   ```

3. **Check total count:**
   ```bash
   curl https://kids-painting-backend-production.up.railway.app/api/paintings?page=0&size=1
   # Check totalElements in response
   ```

## Sync SQL Reference

```sql
-- Add Owl Mandala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
SELECT 
  'owl-mandala',
  'Owl Mandala',
  'A wise owl mandala with intricate patterns perfect for relaxation!',
  'Mandalas',
  'owl,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults,wisdom',
  '/coloring-images/owl_mandala.png',
  '/coloring-images/owl_mandala.png',
  3,
  '["#8B4513","#D2691E","#DEB887","#F4A460","#CD853F"]',
  true,
  0,
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM paintings WHERE url_key = 'owl-mandala'
);

-- Remove obsolete mandalas
DELETE FROM paintings WHERE url_key = 'elephant-mandala';
DELETE FROM paintings WHERE url_key = 'lion-mandala';
```

## Troubleshooting

### "Cannot connect to remote API"
- **Solution**: Start the Railway backend service
- **Alternative**: Use Manual SQL Sync (Method 2)

### "Owl Mandala already exists"
- **Status**: ✅ This is fine, sync is working correctly

### "Duplicate key error"
- **Solution**: The painting already exists, sync will skip it

### Backend deployment issues
- Check Railway logs
- Ensure environment variables are set
- Verify database connection string

## Future Sync Notes

When you add new images:
1. Add the PNG/JPG file to `frontend/public/coloring-images/`
2. Run the sync script
3. The script will auto-detect new images
4. Or manually add via API:
   ```bash
   curl -X POST https://your-backend-url/api/paintings \
     -H "Content-Type: application/json" \
     -d @painting-data.json
   ```

## Support

- Railway Dashboard: https://railway.app
- Backend logs: Check Railway project logs
- Database console: Use Railway Query tab

---

**Last Updated**: October 9, 2025

