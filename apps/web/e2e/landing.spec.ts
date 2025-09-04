import { test, expect } from '@playwright/test';
import fs from 'node:fs';

// Visual regression for marketing landing page
// Ensures baseline screenshot at docs/assets/MarketingLanding.reference.png

test('marketing landing matches baseline', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: `
      *,*::before,*::after{transition:none!important;animation:none!important;}
      html{scroll-behavior:auto!important;}
    `
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const screenshot = await page.screenshot();
  const baseline = fs.readFileSync(
    new URL('../../../docs/assets/MarketingLanding.reference.png', import.meta.url)
  );
  await expect(screenshot).toMatchSnapshot(baseline, {
    maxDiffPixelRatio: 0.03
  });
});
