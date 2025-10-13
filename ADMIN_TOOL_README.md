# 🎨 Painting Admin Tool

A standalone admin tool for managing your coloring page database. This tool is **separate from your website** and only accessible to you.

## Features

✅ **Complete Painting Management**
- View all paintings in a sortable table
- Edit titles, descriptions, categories
- Manage meta tags (title, description, keywords)
- Control difficulty levels and featured status
- Update image URLs and thumbnails
- Live search and filtering

✅ **Local Database Only**
- Only updates your local H2 database
- No direct connection to production
- Safe for testing changes

✅ **Sync to Production**
- Export changes to SQL file
- Review before applying to production
- Manual sync for maximum control

## How to Use

### Step 1: Start Your Backend

Make sure your backend is running locally:

```bash
cd backend
./mvnw spring-boot:run
```

The backend should be running on `http://localhost:8080`

### Step 2: Open the Admin Tool

**Recommended Method** - Use the local web server (avoids CORS issues):

```bash
./serve-admin-tool.sh
```

Then open: `http://localhost:8081/admin-tool.html`

**Alternative** - Open directly in browser (requires CORS fix):

```bash
# If you get CORS errors, restart the backend first:
./restart-backend.sh

# Then open the file:
open admin-tool.html
```

### Step 3: Manage Your Paintings

The admin tool will automatically:
1. Connect to your local API
2. Load all paintings
3. Display them in an editable table

**To Edit a Painting:**
1. Click "✏️ Edit" button on any painting
2. Modify any fields:
   - **Title**: Main heading (used for H1 tag)
   - **URL Key**: Used in the URL path
   - **Description**: Meta description for SEO
   - **Category**: Animals, Vehicles, Nature, Fantasy, Characters
   - **Tags**: Comma-separated keywords for SEO
   - **Image URLs**: Path to the coloring images
   - **Difficulty**: 1 (Easy), 2 (Medium), 3 (Hard)
   - **Featured**: Show on homepage
3. Click "💾 Save Changes"

**Search & Filter:**
- Use the search bar to filter by title, category, or URL

## Syncing to Production

When you're ready to push your local changes to production:

### Option 1: Export SQL (Recommended)

```bash
./sync-to-production.sh
```

This will:
1. Fetch all paintings from your local database
2. Generate a timestamped SQL file in `database-exports/`
3. You can review the SQL before applying it to production

Then manually run the SQL on your production database.

### Option 2: Via Deploy Script

If your deploy script is configured:

```bash
./deploy-to-hostinger.sh
```

### Option 3: Manual Database Copy

Copy your local H2 database file to production (if applicable).

## File Locations

- **Admin Tool**: `admin-tool.html`
- **Sync Script**: `sync-to-production.sh`
- **Database Exports**: `database-exports/` (auto-created)
- **Local Database**: `backend/painting.mv.db` (H2 database file)

## Security

⚠️ **This tool is for local use only!**

- Never deploy `admin-tool.html` to your public website
- The tool only works with your local backend
- No authentication required since it's local-only
- Keep it in your project folder

## Troubleshooting

### CORS Error (403 Forbidden)

**Error**: `Access to fetch at 'http://localhost:8080/api/paintings' from origin 'null' has been blocked by CORS policy`

**Solution**:
1. **Use the web server method** (recommended):
   ```bash
   ./serve-admin-tool.sh
   ```
   Then open `http://localhost:8081/admin-tool.html`

2. **Or restart your backend** to apply CORS fixes:
   ```bash
   ./restart-backend.sh
   ```
   Wait 30 seconds for it to fully start, then try again.

### Can't connect to API

**Error**: "Failed to load paintings"

**Solution**: 
- Make sure backend is running: `cd backend && ./mvnw spring-boot:run`
- Check backend is on port 8080: `http://localhost:8080/api/paintings`
- Check for CORS errors in browser console

### Changes not saving

**Error**: "Failed to save painting"

**Solution**:
- Check backend console for errors
- Verify all required fields are filled
- Check that JSON fields (color palette) are valid JSON

### Can't see images

**Solution**:
- Image paths should be relative: `/coloring-images/image.png`
- Make sure images exist in `frontend/public/coloring-images/`
- Check browser console for 404 errors

## Tips

1. **Batch Editing**: Edit similar images together (e.g., all animals)
2. **SEO Optimization**: 
   - Keep descriptions 150-160 characters
   - Use relevant keywords in tags
   - Use descriptive, clear titles
3. **Test Locally First**: Always test changes locally before syncing to production
4. **Backup**: The sync script keeps dated backups of all exports
5. **Categories**: Use consistent category names (case-sensitive)

## Example Workflow

```bash
# 1. Start backend
cd backend && ./mvnw spring-boot:run

# 2. Open admin tool
open admin-tool.html

# 3. Make your changes in the UI
#    - Edit titles, descriptions, categories
#    - Update meta tags
#    - Change featured status

# 4. Test your changes locally
open http://localhost:3000

# 5. When satisfied, export for production
./sync-to-production.sh

# 6. Review the SQL file
code database-exports/paintings_export_*.sql

# 7. Apply to production (manually or via deploy script)
```

## Need Help?

- **Backend API Docs**: http://localhost:8080/swagger-ui.html
- **H2 Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:file:./painting`
  - Username: `sa`
  - Password: (empty)

---

**Happy Managing! 🎨**

