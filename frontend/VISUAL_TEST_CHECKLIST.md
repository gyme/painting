# ✅ Visual Test Checklist

## Based on Your Screenshots

This checklist matches exactly what you showed me in the screenshots.

---

## Screenshot 1: Homepage Featured Cards

**URL:** http://localhost:3001/es/

### What Should Be in Spanish:

#### Card 1: Fairy Butterfly
- [ ] Badge: **"⭐ ¡Destacado!"** (not "Featured!")
- [ ] Difficulty: **"⭐⭐ Medio"** (not "Medium")
- [ ] Category: **"Fantasía"** (not "Fantasy")
- [ ] Views: **"👁️ 18 vistas"** (not "18 views")

#### Card 2: Fairy
- [ ] Badge: **"⭐ ¡Destacado!"** (not "Featured!")
- [ ] Difficulty: **"⭐⭐ Medio"** (not "Medium")
- [ ] Category: **"Fantasía"** (not "Fantasy")
- [ ] Views: **"👁️ 26 vistas"** (not "26 views")

#### Card 3: Elephant Mandala
- [ ] Badge: **"⭐ ¡Destacado!"** (not "Featured!")
- [ ] Difficulty: **"⭐⭐⭐ Difícil"** (not "Hard")
- [ ] Category: **"Animales"** (not "Animals")
- [ ] Views: **"👁️ 9 vistas"** (not "9 views")

#### Card 4: Bird Mandala
- [ ] Badge: **"⭐ ¡Destacado!"** (not "Featured!")
- [ ] Difficulty: **"⭐⭐⭐ Difícil"** (not "Hard")
- [ ] Category: **"Animales"** (not "Animals")
- [ ] Views: **"👁️ 20 vistas"** (not "20 views")

#### Section Title
- [ ] **"⭐ Páginas Destacadas"** ✅ (This was already correct!)

---

## Screenshot 2: Breadcrumbs on Painting Page

**URL:** http://localhost:3001/es/painting/fairy

### What Should Be in Spanish:

#### Breadcrumbs
- [ ] **"Inicio / Fantasía / Fairy"**
  - "Home" → **"Inicio"** ✅
  - "Fantasy" → **"Fantasía"** ✅
  - "Fairy" stays as is (from database)

#### Back Button
- [ ] **"← Volver a la Galería"** (not "← Back to Gallery")

---

## Screenshot 3: More Fantasy Pages Section

**URL:** http://localhost:3001/es/painting/fairy
(Scroll down to see related pages)

### What Should Be in Spanish:

#### Section Title
- [ ] **"Más Fantasía Páginas"** (not "More Fantasy Pages")

#### Card 1: Wizard
- [ ] Difficulty: **"⭐⭐ Medio"** (not "Medium")
- [ ] Category: **"Fantasía"** (not "Fantasy")
- [ ] Views: **"👁️ 144 vistas"** (not "144 views")

#### Card 2: Witch Hat
- [ ] Difficulty: **"⭐⭐ Medio"** (not "Medium")
- [ ] Category: **"Fantasía"** (not "Fantasy")
- [ ] Views: **"👁️ 10 vistas"** (not "10 views")

#### Card 3: Witch Cat
- [ ] Difficulty: **"⭐⭐ Medio"** (not "Medium")
- [ ] Category: **"Fantasía"** (not "Fantasy")
- [ ] Views: **"👁️ 21 vistas"** (not "21 views")

---

## Quick Test Commands

### Start Dev Server
```bash
cd /Users/guym/Documents/d/paiting/frontend
npm run dev
```

### Test URLs

**Homepage:**
```
http://localhost:3001/es/
```
Check all cards match Screenshot 1 checklist

**Painting Page:**
```
http://localhost:3001/es/painting/fairy
```
Check breadcrumbs and back button (Screenshot 2)
Scroll down to check "More Fantasy Pages" (Screenshot 3)

**Other Categories:**
```
http://localhost:3001/es/category/Animals
```
Should show "Animales" everywhere

```
http://localhost:3001/es/category/Vehicles
```
Should show "Vehículos" everywhere

---

## What Should Change When You Switch Languages

### Click English Flag 🇺🇸 (at /)
- All badges: "Featured!", "Medium", "Hard"
- All counts: "views"
- All categories: "Fantasy", "Animals", "Vehicles"
- Breadcrumbs: "Home"
- Button: "Back to Gallery"

### Click Spanish Flag 🇪🇸 (at /es/)
- All badges: "¡Destacado!", "Medio", "Difícil"
- All counts: "vistas"
- All categories: "Fantasía", "Animales", "Vehículos"
- Breadcrumbs: "Inicio"
- Button: "Volver a la Galería"

---

## All Categories Translation Check

| English | Spanish | Test URL |
|---------|---------|----------|
| Animals | Animales | /es/category/Animals |
| Vehicles | Vehículos | /es/category/Vehicles |
| Nature | Naturaleza | /es/category/Nature |
| Fantasy | Fantasía | /es/category/Fantasy |
| Characters | Personajes | /es/category/Characters |
| Food | Comida | /es/category/Food |
| Holidays | Festividades | /es/category/Holidays |

Each category page should show:
- Breadcrumbs: "Inicio / {Category in Spanish}"
- All cards with Spanish badges
- All view counts as "vistas"
- Category badge on each card in Spanish

---

## Difficulty Levels Check

| English | Spanish | Stars |
|---------|---------|-------|
| Easy | Fácil | ⭐ |
| Medium | Medio | ⭐⭐ |
| Hard | Difícil | ⭐⭐⭐ |

---

## Special Cases Check

### Singular vs Plural Views

Visit paintings with 1 view:
```
http://localhost:3001/es/painting/[painting-with-1-view]
```
Should show: **"👁️ 1 vista"** (not "1 vistas")

Visit paintings with multiple views:
```
http://localhost:3001/es/painting/fairy
```
Should show: **"👁️ 26 vistas"**

---

## Complete Test Flow

1. **Start fresh:** http://localhost:3001/
2. **Check English:** Everything in English
3. **Click 🇪🇸 flag**
4. **URL changes to:** http://localhost:3001/es/
5. **Verify:**
   - All badges Spanish
   - All view counts Spanish
   - All categories Spanish
   - Section titles Spanish
6. **Click a painting**
7. **Verify:**
   - Breadcrumbs: "Inicio / {Category} / {Title}"
   - Back button: "Volver a la Galería"
   - Related section: "Más {Category} Páginas"
8. **Click 🇺🇸 flag**
9. **Verify:** Everything back to English

---

## 🎯 Success Criteria

**PASS:** All checkboxes above are checked ✅

**FAIL:** Any badge, label, or view count still in English on Spanish pages

---

## Current Status: ✅ READY TO TEST

All code is implemented and built successfully.

**Run the dev server and test now!**

```bash
npm run dev
# Visit http://localhost:3001/es/
```

---

## If Something Doesn't Translate

1. **Check browser cache:** Hard refresh (Cmd+Shift+R)
2. **Check URL:** Must start with `/es/` for Spanish
3. **Check localStorage:** Clear browser storage
4. **Restart dev server:** `npm run dev`

---

## 🚀 Deploy Checklist

Before deploying:
- [ ] All tests pass
- [ ] English and Spanish both work
- [ ] Language switcher toggles correctly
- [ ] URL changes between `/` and `/es/`
- [ ] All cards translate
- [ ] All badges translate
- [ ] All view counts translate
- [ ] Build succeeds: `npm run build`
- [ ] Generate bilingual sitemap: `npm run generate-sitemap:bilingual`

Ready to deploy! 🎉

