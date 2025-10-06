# Kids Painting Mobile App

React Native mobile app built with Expo for iOS and Android.

## Setup

```bash
npm install
npm start
```

## Run on Device

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Configuration

Update the API URL in `src/api/paintings.ts`:

```typescript
const API_BASE_URL = 'http://your-backend-url:8080/api'
```

For local development on physical device, use your computer's IP address:
```typescript
const API_BASE_URL = 'http://192.168.1.100:8080/api'
```

## Building for Production

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Configure EAS:
```bash
eas build:configure
```

3. Build for iOS:
```bash
eas build --platform ios
```

4. Build for Android:
```bash
eas build --platform android
```

## Features

- Native iOS and Android support
- Beautiful gradient UI
- Smooth animations
- Category browsing
- Painting details
- Share functionality (coming soon)
