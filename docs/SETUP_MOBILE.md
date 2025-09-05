# Mobile Setup

## Prerequisites
- Xcode or Android Studio
- Expo CLI

## Install and run
```bash
cd apps/mobile
npm install
npm run align
npx expo start -c
```

### Environment variables
| key | description |
| --- | --- |
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `EXPO_PUBLIC_SUPABASE_KEY` | public anon key |

`expo doctor` may be unavailable; the align script falls back to `expo-doctor`. On macOS, pods are installed automatically.
