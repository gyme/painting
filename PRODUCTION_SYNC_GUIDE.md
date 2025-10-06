# 🔄 Production Sync Guide

## 🎯 Quick Sync (Recommended)

### One-Command Sync:
```bash
cd /Users/guym/Documents/d/paiting/tools
./sync-to-production.sh
```

**What it does:**
1. Cleans up old/invalid database entries
2. Imports all your current images
3. Skips duplicates automatically

**When to use:**
- After adding new coloring pages
- After removing pages
- When production is out of sync with local

---

## 🔧 Manual Sync (Step-by-Step)

### Step 1: Cleanup Old Data
```bash
cd /Users/guym/Documents/d/paiting/tools
./cleanup-production.sh
```
Enter your backend URL when prompted: `https://your-backend.onrender.com`

### Step 2: Import New Images
```bash
./import-to-production.sh
```
Enter your backend URL when prompted: `https://your-backend.onrender.com`

---

## 📋 Available Scripts

### 1. **sync-to-production.sh** (⭐ Recommended)
Complete sync: cleanup + import in one command

### 2. **cleanup-production.sh**
Remove database entries without image files

### 3. **import-to-production.sh**
Import all images from local to production

### 4. **cleanup-database.js** (Local)
Cleanup local database

### 5. **bulk-import-paintings.js** (Local)
Import to local database

---

## 🚀 Workflow: Adding New Images

### Option A: Automatic (Using Git)

1. **Add new images locally:**
   ```bash
   # Add your new image
   cp new-image.png frontend/public/coloring-images/
   ```

2. **Commit and push:**
   ```bash
   git add frontend/public/coloring-images/new-image.png
   git commit -m "Add new coloring page: new-image"
   git push
   ```

3. **Wait for Render to redeploy** (2-3 minutes)

4. **Sync database:**
   ```bash
   cd tools
   ./sync-to-production.sh
   ```
   Enter: `https://your-backend.onrender.com`

5. **Done!** ✅ Visit your site to see the new image

---

### Option B: Batch Import

1. **Add multiple images locally:**
   ```bash
   cp image1.png image2.png image3.png frontend/public/coloring-images/
   ```

2. **Import to local database first:**
   ```bash
   cd tools
   node bulk-import-paintings.js ../frontend/public/coloring-images --skip-existing
   ```

3. **Test locally:**
   ```bash
   cd ..
   ./start.sh
   ```
   Visit: http://localhost:3000

4. **Commit and push:**
   ```bash
   git add frontend/public/coloring-images/*.png
   git commit -m "Add new coloring pages"
   git push
   ```

5. **Sync to production:**
   ```bash
   cd tools
   ./sync-to-production.sh
   ```

---

## 🔄 Keep Production Synced

### Automatic Sync (Future Enhancement)

You could set up a GitHub Action to auto-sync on push. Create `.github/workflows/sync-production.yml`:

```yaml
name: Sync Production Database

on:
  push:
    paths:
      - 'frontend/public/coloring-images/**'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: cd tools && npm install
      - name: Sync to production
        env:
          BACKEND_URL: ${{ secrets.BACKEND_URL }}
        run: |
          cd tools
          echo "y" | API_URL="${BACKEND_URL}/api/paintings" node bulk-import-paintings.js ../frontend/public/coloring-images --skip-existing
```

Then add `BACKEND_URL` as a GitHub secret.

---

## 🐛 Troubleshooting

### Issue: "Connection refused" or "Network error"
**Solution:** Check your backend URL and make sure backend is running

### Issue: "Duplicate key error"
**Solution:** Use `--skip-existing` flag or run cleanup first

### Issue: "Images showing on site but not in database"
**Solution:** Run `./sync-to-production.sh` to import metadata

### Issue: "Old images still showing"
**Solution:** 
1. Run cleanup: `./cleanup-production.sh`
2. Then import: `./import-to-production.sh`
3. Or use: `./sync-to-production.sh` (does both)

### Issue: "Production and local out of sync"
**Solution:** Run `./sync-to-production.sh` - it's idempotent!

---

## 📊 Check Database Status

### Production:
```bash
curl https://your-backend.onrender.com/api/paintings?page=0&size=100
```

### Local:
```bash
curl http://localhost:8080/api/paintings?page=0&size=100
```

---

## 💡 Best Practices

1. **Always test locally first** before syncing to production
2. **Commit images to git** so they're on the static site
3. **Run sync script** after deploying new images
4. **Use `--skip-existing`** to avoid duplicate errors
5. **Check production site** after syncing to verify

---

## ✅ Checklist: New Image Deployment

- [ ] Add image to `frontend/public/coloring-images/`
- [ ] Test locally: `./start.sh` → http://localhost:3000
- [ ] Commit: `git add` + `git commit` + `git push`
- [ ] Wait for Render redeploy (~2-3 min)
- [ ] Run: `./sync-to-production.sh`
- [ ] Verify: Visit production site
- [ ] ✅ Done!

---

## 🎉 Quick Commands Reference

```bash
# Full sync (cleanup + import)
./sync-to-production.sh

# Just cleanup
./cleanup-production.sh

# Just import
./import-to-production.sh

# Local operations
node cleanup-database.js
node bulk-import-paintings.js ../frontend/public/coloring-images
```

---

**Your production database will always match your local images!** 🎨✨
