# 🔄 Restart Production Backend (Railway)

## Quick Steps:

1. **Go to Railway Dashboard:**
   - Visit: https://railway.app/dashboard
   - Login with your account

2. **Find Your Project:**
   - Look for: `docker-composeyaml-production`
   - Click on it

3. **Restart the Backend:**
   - Click on the service/deployment
   - Find the "Settings" or "..." menu
   - Click **"Restart"** or **"Redeploy"**

4. **Wait for Restart:**
   - Wait ~30 seconds for the service to restart
   - The cache will be cleared automatically

5. **Verify:**
   ```bash
   curl https://docker-composeyaml-production.up.railway.app/api/paintings/categories
   ```
   
   You should now see:
   ```json
   ["Animals", "Basketball Players", "Characters", "Dinosaurs", 
    "Fairy Tales", "Fantasy", "Food", "Holidays", "Italian Brainrot", 
    "K Pop Demon Hunters", "Mandalas", "Nature", "Numbers", 
    "Sports", "Vehicles"]
   ```

## Alternative: Wait 24 Hours
The cache will automatically expire after 24 hours, but restarting is faster!

---

## What Was Added:
- ✅ **8 Basketball Players** (LeBron, Jordan, Curry, Kobe, etc.)
- ✅ **5 K-Pop Demon Hunters** (Mira, Rumi, Zoey, The Saja Boys, Team)
- ✅ **11 Numbers** (0-10 for kids learning)
- ✅ **1 Flower Mandala** (added to Mandalas category)

**Total: 25 new coloring pages!** 🎨


