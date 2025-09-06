import { test, expect } from '@playwright/test';

test('exact brand logo is present', async ({ page }) => {
  await page.goto(process.env.PLAYWRIGHT_BASE_URL || '/');
  const svg = page.locator('svg[aria-label="thecueRoom logo with anchored blink"]');
  await expect(svg).toBeVisible();
  // blink path exists
  await expect(page.locator('#blinkPath')).toHaveCount(1);
});

