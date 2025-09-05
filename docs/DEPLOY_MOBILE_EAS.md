# Deploy Mobile with EAS

Use the profiles in `apps/mobile/eas.json`.

Build:
```bash
cd apps/mobile
npx eas build --profile production --platform ios
npx eas build --profile production --platform android
```

Submit:
```bash
npx eas submit --platform ios --profile production
npx eas submit --platform android --profile production
```
