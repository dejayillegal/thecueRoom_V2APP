import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Fail test on console.error
  page.on('console', (msg) => {
    if (msg.type() === 'error') throw new Error(`Console error: ${msg.text()}`);
  });
});

test('landing renders without console errors', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('img[src="/landing.svg"]')).toBeVisible();
});
