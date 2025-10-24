# 🌍 Internationalization (i18n) Setup Guide

This application supports multiple languages using **react-i18next**. Currently available languages:
- 🇺🇸 English (default)
- 🇪🇸 Spanish

## How It Works

The app automatically detects the user's browser language and displays content in that language. If the detected language is not available, it falls back to English. Users can also manually switch languages using the language switcher in the header.

## File Structure

```
frontend/src/
├── i18n.ts                              # i18n configuration
├── locales/
│   ├── en/
│   │   └── translation.json            # English translations
│   └── es/
│       └── translation.json            # Spanish translations
└── components/
    └── LanguageSwitcher.tsx            # Language switcher component
```

## Using Translations in Components

### 1. Import the translation hook

```tsx
import { useTranslation } from 'react-i18next'
```

### 2. Use the hook in your component

```tsx
function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('header.title')}</h1>
      <button>{t('coloring.tools.save')}</button>
    </div>
  )
}
```

### 3. Access nested translation keys

Translation keys are organized hierarchically. Use dot notation to access nested keys:

```tsx
t('coloring.tools.fill')        // "Fill" or "Rellenar"
t('coloring.colors.brightRed')  // "Bright Red" or "Rojo Brillante"
t('common.language')             // "Language" or "Idioma"
```

## Available Translation Keys

### Common
- `common.language` - Language

### Coloring Interface
- `coloring.paletteTitle` - Pick a Color
- `coloring.tools.*` - fill, brush, eraser, undo, redo, clear, save, print, reset, erase
- `coloring.colors.*` - All color names (black, darkBrown, brightRed, etc.)

### Header & Navigation
- `header.title` - App title
- `header.menu` - Menu

### Footer
- `footer.copyright` - Copyright text
- `footer.privacy` - Privacy Policy
- `footer.terms` - Terms of Service
- `footer.contact` - Contact Us

### Search
- `search.placeholder` - Search placeholder text
- `search.noResults` - No results message

### Categories
- `categories.all` - All Categories
- `categories.animals` - Animals
- `categories.vehicles` - Vehicles
- `categories.nature` - Nature
- `categories.characters` - Characters

### Page States
- `page.loading` - Loading...
- `page.error` - Something went wrong
- `page.notFound` - Page not found

## Adding a New Language

### Step 1: Create Translation File

1. Copy the English translation file:
   ```bash
   cp src/locales/en/translation.json src/locales/[language-code]/translation.json
   ```

2. Translate all the values in the new file (keep the keys the same!)

Example for French (`src/locales/fr/translation.json`):
```json
{
  "common": {
    "language": "Langue"
  },
  "coloring": {
    "paletteTitle": "🎨 Choisir une Couleur",
    "tools": {
      "fill": "Remplir",
      "brush": "Pinceau",
      ...
    }
  }
}
```

### Step 2: Update i18n Configuration

Open `src/i18n.ts` and add your language:

```typescript
// 1. Import the translation
import frTranslation from './locales/fr/translation.json'

// 2. Add to resources
const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation }  // Add this
}

// 3. Add to availableLanguages
export const availableLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' }  // Add this
]
```

### Step 3: Add Language Flag (Optional)

Open `src/components/LanguageSwitcher.tsx` and add the flag emoji:

```typescript
const getLanguageFlag = (code: string) => {
  const flags: { [key: string]: string } = {
    'en': '🇺🇸',
    'es': '🇪🇸',
    'fr': '🇫🇷',  // Add this
  }
  return flags[code] || '🌐'
}
```

That's it! The new language will automatically appear in the language switcher.

## Language Detection

The app uses the following order to detect the user's language:

1. **localStorage** - Previously selected language (persisted)
2. **navigator** - Browser language setting
3. **htmlTag** - HTML lang attribute
4. **Fallback** - English (default)

The selected language is automatically saved to localStorage and will be remembered on future visits.

## Testing Translations

### Test language switching
1. Start the dev server: `npm run dev`
2. Open the app in your browser
3. Click the language switcher in the header
4. Switch between languages to verify all text is translated

### Test browser language detection
1. Clear localStorage: `localStorage.clear()`
2. Change your browser language settings
3. Refresh the page
4. The app should display in your browser's language (if available)

## Common Issues

### Translations not updating
- Make sure you're using the correct translation key
- Check that the key exists in all translation files
- Clear your browser cache and reload

### New language not appearing
- Verify you imported the translation in `i18n.ts`
- Check that you added it to both `resources` and `availableLanguages`
- Restart the dev server

### Missing translations showing as keys
- This means the translation key doesn't exist in the current language
- Add the missing key to the appropriate `translation.json` file
- The key path should match exactly (e.g., `coloring.tools.save`)

## Best Practices

1. **Keep keys organized** - Use hierarchical structure (e.g., `category.subcategory.item`)
2. **Use descriptive keys** - `coloring.tools.fill` is better than `btn1`
3. **Maintain consistency** - Keep the same keys across all language files
4. **Test thoroughly** - Check all UI elements after adding translations
5. **Update all languages** - When adding new keys, add them to ALL language files

## Supported Language Codes

Common language codes (ISO 639-1):
- `en` - English
- `es` - Spanish / Español
- `fr` - French / Français
- `de` - German / Deutsch
- `it` - Italian / Italiano
- `pt` - Portuguese / Português
- `ja` - Japanese / 日本語
- `ko` - Korean / 한국어
- `zh` - Chinese / 中文
- `ar` - Arabic / العربية
- `ru` - Russian / Русский
- `hi` - Hindi / हिन्दी

## Resources

- [react-i18next documentation](https://react.i18next.com/)
- [i18next documentation](https://www.i18next.com/)
- [Language codes list](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

---

**Need help?** Check the comments in `src/i18n.ts` for quick reference on adding new languages.

