# Commit Message for feat/site-upgrade-v1

```
feat: Implement site upgrade with SEO, UX, and accessibility enhancements

Major improvements across frontend and content validation:

FEATURES:
- Hero section with clear value prop and CTAs (Browse/Random)
- /random route for instant random coloring page
- Enhanced top navigation with 7 categories
- CategoryPage filters (Difficulty, Age) and sorting (Newest, Most Printed)
- Related pages section (3-6 items) with "Next Random Page" button
- Print & Download PDF buttons with paper size selection (US Letter/A4)
- Build-time license validation for copyright compliance
- /copyright page with DMCA policy and contact info

SEO:
- Enhanced JSON-LD with CreativeWork + ImageObject schema
- Improved meta descriptions and titles
- Better alt text: "[Title] coloring page outline for kids - [Category]"

ACCESSIBILITY:
- Skip-to-content link
- Enhanced keyboard focus states (3px outline)
- ARIA labels on all interactive elements
- Semantic HTML with <main> landmark

PRINT:
- Print-specific CSS (hides nav/footer, full-bleed, bold lines ≥2px)
- Dynamic paper size injection (US Letter/A4)
- Optimized for print-to-PDF

FILES CHANGED:
- frontend/src/pages/HomePage.tsx (hero, CTAs)
- frontend/src/pages/RandomPage.tsx (NEW)
- frontend/src/pages/PaintingPage.tsx (JSON-LD, related, buttons)
- frontend/src/pages/CategoryPage.tsx (filters, sorting)
- frontend/src/pages/CopyrightPage.tsx (NEW)
- frontend/src/components/Header.tsx (nav categories)
- frontend/src/App.tsx (routes, skip-to-content)
- frontend/src/index.css (print CSS, focus states)
- frontend/validate-content-license.js (NEW)
- frontend/content-metadata.json (NEW)
- frontend/package.json (license validation script)

PENDING (Future PRs):
- WebP/AVIF image optimization
- Backend PDF generation API
- Backend schema updates (ageRange, printCount, style, licenseType)

✅ 11/14 tasks completed (79%)
✅ No linter errors
✅ All existing tests passing
```

---

## Git Commands to Run:

```bash
cd /Users/guym/Documents/d/paiting
git add .
git commit -F COMMIT_MESSAGE.md
git push origin feat/site-upgrade-v1
```

Then create a Pull Request on GitHub/GitLab.

