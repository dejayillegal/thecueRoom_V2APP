import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Fail test on console.error
  page.on('console', (msg) => {
    if (
      msg.type() === 'error' &&
      !msg.text().includes('Failed to load resource: the server responded with a status of 400')
    ) {
      throw new Error(`Console error: ${msg.text()}`);
    }
  });
});

test('landing renders without console errors', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.ok()).toBeTruthy();
});
