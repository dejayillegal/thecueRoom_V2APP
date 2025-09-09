import { test, expect } from '@playwright/test';

test('header logo renders with exact svg + hero image loads', async ({ page }) => {
  await page.goto(process.env.PLAYWRIGHT_BASE_URL || '/');
  await expect(page.locator('svg[aria-label="thecueRoom logo with anchored blink"]')).toBeVisible();
  await expect(page.locator('#blinkPath')).toHaveCount(1);

  const img = page.locator('img[alt="TheCueRoom marketing landing"]');
  await expect(img).toBeVisible();
  await expect(img.evaluate((el: HTMLImageElement) => el.naturalWidth > 0)).resolves.toBeTruthy();
});
